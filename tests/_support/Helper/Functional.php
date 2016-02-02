<?php
namespace Helper;

class Functional extends \Codeception\Module
{
    public function login($email) {
        $user = $this->loadUserByEmail($email);
        $jwtManager = $this->getModule('Symfony2')->grabServiceFromContainer('lexik_jwt_authentication.jwt_manager');

        $token = $jwtManager->create($user);
        $this->getModule('REST')->haveHttpHeader('Authorization', 'Bearer ' . $token);

        $this->getModule('REST')->sendGET('api/users/' . $user->getId() . '.json');
        $this->getModule('REST')->seeResponseContainsJson(['id' => $user->getId()]);

        return $this->getModule('REST')->seeResponseCodeIs(200);
    }

    public function logout() {
        return $this->getModule('REST')->haveHttpHeader('Authorization', 'Bearer');
    }

    public function loadUserByEmail($email) {
        $registry = $this->getModule('Symfony2')->grabServiceFromContainer('doctrine_mongodb');
        $repository = $registry->getRepository('MapBundle:User');

        return $repository->findOneByEmail($email);
    }

    public function loadUser($id) {
        $registry = $this->getModule('Symfony2')->grabServiceFromContainer('doctrine_mongodb');
        $repository = $registry->getRepository('MapBundle:User');

        return $repository->find((string)$id);
    }
}
