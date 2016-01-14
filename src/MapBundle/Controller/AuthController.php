<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpNotFoundException;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authentication\Token\AnonymousToken;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class AuthController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $registry)
    {
        $this->dm = $registry->getManager();
        $this->repository = $registry->getRepository('MapBundle:User');
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "auth",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   input="MapBundle\Form\Type\LoginType"
     * )
     */
    public function postLoginAction(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        $user = $this->repository->findOneByEmail($email);

        if(!$user instanceof User || !$this->checkUserPassword($user, $password)){
            $this->logoutUser();

            $errors = [
                'errors' => [
                    'children' => [
                        'credentials' => [
                            'errors' => [
                                'Invalid credentials',
                            ],
                        ],
                    ],
                ],
            ];

            return $this->handleView($this->view($errors, 400));
        }

        $user = $this->loginUser($user);

        return $this->handleView($this->view($user));
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "auth",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     */
    public function postLogoutAction()
    {
        $this->logoutUser();

        return $this->handleView($this->view());
    }

    protected function loginUser(User $user)
    {
        $securityContext = $this->get('security.context');
        $roles = $user->getRoles();
        $token = new UsernamePasswordToken($user, null, 'main', $roles);
        $securityContext->setToken($token);

        return $securityContext->getToken()->getUser();
    }

    protected function logoutUser()
    {
        $securityContext = $this->get('security.context');
        $token = new AnonymousToken(null, new User());
        $securityContext->setToken($token);
        $this->get('session')->invalidate();
    }

    protected function checkUserPassword(User $user, $password)
    {
        $factory = $this->get('security.encoder_factory');
        $encoder = $factory->getEncoder($user);
        if(!$encoder){
            return false;
        }
        return $encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt());
    }
}