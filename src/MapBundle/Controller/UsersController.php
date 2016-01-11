<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\User;
use MapBundle\Form\Type\PasswordType;
use MapBundle\Form\Type\RegisterUserType;
use MapBundle\Form\Type\UserType;
use Symfony\Component\HttpFoundation\Request;

class UsersController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $dm)
    {
        $this->dm = $dm;
        $this->repository = $dm->getRepository('MapBundle:User');
    }

    public function getUsersAction()
    {
        $this->denyAccessUnlessGranted('view', new User);

        $users = $this->repository->findAll();
        $view = $this->view($users);

        return $this->handleView($view);
    }

    public function postUsersAction(Request $request)
    {
        $user = new User;

        $form = $this->createForm(new RegisterUserType, $user);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $encoder = $this->container->get('security.password_encoder');
            $user->setPassword($encoder->encodePassword($user, $user->getPassword()));
            $this->dm->persist($user);
            $this->dm->flush();
            //ToDo: hide internal data
            $view = $this->view($user);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    public function putUserAction(Request $request, $user)
    {
        $user = $this->repository->find($user);
        if (!$user) {
            $view = $this->view(null, 404);
        } else {
            $this->denyAccessUnlessGranted('edit', $user);

            $form = $this->createForm(new UserType, $user, array('method' => 'PUT'));
            $form->handleRequest($request);

            if ($form->isValid()) {
                $this->dm->flush();
                $view = $this->view();
            } else {
                $view = $this->view($form, 400);
            }

        }

        return $this->handleView($view);
    }

    public function putUserPasswordAction(Request $request, $user)
    {
        $user = $this->repository->find($user);
        if (!$user) {
            $view = $this->view(null, 404);
        } else {
            $this->denyAccessUnlessGranted('edit_password', $user);

            $form = $this->createForm(new PasswordType, $user, array('method' => 'PUT'));
            $form->handleRequest($request);

            if ($form->isValid()) {
                $encoder = $this->container->get('security.password_encoder');
                $user->setPassword($encoder->encodePassword($user, $user->getPassword()));
                $this->dm->flush();
                $view = $this->view();
            } else {
                $view = $this->view($form, 400);
            }
        }

        return $this->handleView($view);
    }


    public function getUserAction($user)
    {
        if ($user === 'current') {
            $user = $this->get('security.context')->getToken()->getUser();
            $view = $user instanceof User ? $this->view($user) : $this->view(null);

            return $this->handleView($view);
        }

        $user = $this->repository->find($user);
        $this->denyAccessUnlessGranted('view', $user);

        $view = $user ? $this->view($user) : $this->view(null, 404);

        return $this->handleView($view);
    }

    public function putUserAdminAction($user)
    {
        return $this->updateAdmin($user, true);
    }

    public function deleteUserAdminAction($user)
    {
        return $this->updateAdmin($user, false);
    }

    protected function updateAdmin($user, $isAdmin)
    {
        $user = $this->repository->find($user);
        if (!$user) {
            $view = $this->view(null, 404);
        } else {
            $this->denyAccessUnlessGranted('edit_admin', $user);

            $user->setIsAdmin($isAdmin);
            $this->dm->flush();

            $view = $this->view();
        }

        return $this->handleView($view);
    }
}
