<?php

namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use Google_Client;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManagerInterface;
use MapBundle\Document\User;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations\Prefix;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Prefix("api")
 */
class AuthController extends FOSRestController
{
    protected $dm;

    protected $repository;

    protected $googleClient;

    protected $validator;

    protected $tokenManager;

    public function __construct(ManagerRegistry $registry, Google_Client $googleClient, ValidatorInterface $validator, JWTManagerInterface $tokenManager)
    {
        $this->dm = $registry->getManager();
        $this->repository = $registry->getRepository('MapBundle:User');
        $this->googleClient = $googleClient;
        $this->validator = $validator;
        $this->tokenManager = $tokenManager;
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
        $token = $request->get('token');
        if (empty($token)) {
            return $this->handleView($this->view('Invalid credentials.', 400));
        }

        $loginTicket = $this->googleClient->getAuth()->verifyIdToken($token, $this->container->getParameter('google_developer_key'));
        if (empty($loginTicket)) {
            return $this->handleView($this->view('Invalid credentials.', 400));
        }

        $payload = $loginTicket->getAttributes()['payload'];
        $email = $payload['email'];

// Disabled temporarily to make testing multiple accounts easier
//        if (!preg_match('/@x-team.com$/', $email)) {
//            return $this->handleView($this->view('Invalid email address.', 400));
//        }

        $user = $this->repository->findOneByEmail($email) ?: new User();
        $this->updateUserWithPayload($user, $payload);

        if (!count($this->validator->validate($user))) {
            $this->dm->persist($user);
            $this->dm->flush();

            $jwt = $this->tokenManager->create($user);
            $view = $this->view(['user' => $user, 'token' => $jwt]);
        } else {
            $view = $this->view('Invalid user data.', 400);
        }

        return $this->handleView($view);
    }

    protected function updateUserWithPayload(User $user, $payload)
    {
        $user->setEmail($payload['email']);
        $user->setFirstName($payload['given_name']);
        $user->setLastName($payload['family_name']);
        $user->setAvatar($payload['picture']);
    }
}
