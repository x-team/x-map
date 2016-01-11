<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\Organization;
use MapBundle\Document\User;
use MapBundle\Form\Type\OrganizationType;
use MapBundle\Form\Type\UserType;
use Symfony\Component\HttpFoundation\Request;

class OrganizationsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $dm)
    {
        $this->dm = $dm;
        $this->repository = $dm->getRepository('MapBundle:Organization');
    }

    public function getOrganizationsAction()
    {
        $organizations = $this->repository->findAll();
        $view = $this->view($organizations);

        return $this->handleView($view);
    }

    public function postOrganizationAction(Request $request)
    {
        $organization = new Organization;

        $this->denyAccessUnlessGranted('create', $organization);

        $form = $this->createForm(new OrganizationType, $organization);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->persist($organization);
            $this->dm->flush();
            $view = $this->view();
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    public function putOrganizationAction(Request $request, $organization)
    {
        $organization = $this->repository->find($organization);
        if (!$organization) {
            $view = $this->view(null, 404);
        } else {

            $this->denyAccessUnlessGranted('edit', $organization);

            $form = $this->createForm(new OrganizationType, $organization, array('method' => 'PUT'));
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

    public function getOrganizationAction($organization)
    {
        $organization = $this->repository->find($organization);

        $this->denyAccessUnlessGranted('view', $organization);

        $view = $organization ? $this->view($organization) : $this->view(null, 404);

        return $this->handleView($view);
    }

    public function putOrganizationUserAction($organization, $user) {
        $userRepository = $this->dm->getRepository('MapBundle:User');

        $organization = $this->repository->find($organization);

        $user = $userRepository->find($user);
        if (!$organization || !$user) {
            $view = $this->view(null, 404);
        } else {
            $this->denyAccessUnlessGranted('link', $organization);

            $user->setOrganization($organization->getId());
            $this->dm->flush();

            $view = $this->view();
        }

        return $this->handleView($view);
    }

    public function deleteOrganizationUserAction($organization, $user) {
        $userRepository = $this->dm->getRepository('MapBundle:User');

        $organization = $this->repository->find($organization);

        $user = $userRepository->find($user);
        if (!$organization || !$user) {
            $view = $this->view(null, 404);
        } else {
            $this->denyAccessUnlessGranted('link', $organization);

            $user->setOrganization(null);
            $user->setTeams([]);
            $this->dm->flush();

            $view = $this->view();
        }

        return $this->handleView($view);
    }
}
