<?php
namespace Helper;

class Functional extends \Codeception\Module
{
    public function login($email, $password) {
        return $this->getModule('REST')->sendPOST('logins.json', [
            'email' => $email,
            'password' => $password,
        ]);
    }

    public function logout() {
        return $this->getModule('REST')->sendPOST('logouts.json');
    }
}
