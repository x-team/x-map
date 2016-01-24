<?php
namespace Helper;

class Functional extends \Codeception\Module
{
    public function login($email, $password) {
        $this->getModule('REST')->sendPOST('api/logins.json', [
            'email' => $email,
            'password' => $password,
        ]);

        return $this->getModule('REST')->seeResponseCodeIs(200);
    }

    public function logout() {
        return $this->getModule('REST')->sendPOST('api/logouts.json');
    }
}
