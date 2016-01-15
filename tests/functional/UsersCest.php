<?php

use MapBundle\Document\User;

class UsersCest
{
    protected $user = [
        'username' => 'bobbudowniczy1',
        'password' => 'testtest1',
        'email' => 'bob1@test.pl',
    ];

    protected $admin = [
        'username' => 'admin',
        'password' => 'admin',
        'email' => 'admin@test.pl',
        'isAdmin' => true
    ];

    public function _before(FunctionalTester $I) {
        $encoder = $I->grabServiceFromContainer('security.password_encoder');
        $I->haveInCollection('User', array_merge($this->user, ['password' => $encoder->encodePassword(new User, $this->user['password'])]));
        $I->haveInCollection('User', array_merge($this->admin, ['password' => $encoder->encodePassword(new User, $this->admin['password'])]));
    }

    public function tryToRegisterAndUpdate(FunctionalTester $I)
    {
        $user = [
            'username' => 'bobbudowniczy',
            'password' => 'testtest',
        ];

        $I->sendPOST('users.json', $user);

        $I->seeResponseCodeIs(400);

        $user['email'] = 'bob@test.pl';

        $I->sendPOST('users.json', $user);
        $I->seeResponseCodeIs(200);

        unset($user['password']);

        $I->seeResponseContainsJson($user);
        $I->dontSeeResponseContains('password');

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->login($user['email'], 'testtest');
        $I->seeResponseCodeIs(200);

        $I->sendGET('users/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(array_merge(['id' => $id], $user));
        $I->dontSeeResponseContains('password');

        $I->sendGET('users/current.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(array_merge(['id' => $id], $user));
        $I->dontSeeResponseContains('password');

        $I->sendPUT('users/' . $id . '.json', ['nationality' => 'Polish']);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(array_merge(['id' => $id], $user, ['nationality' => 'Polish']));

        //ToDo: validate old password is required
//        $I->sendPUT('users/' . $id . '/password.json', ['old_password' => '', 'password' => '123456']);
//        $I->seeResponseCodeIs(400);

        $I->sendPUT('users/' . $id . '/password.json', ['old_password' => 'testtest', 'password' => '123456']);
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(array_merge(['id' => $id], $user));

        $anotherUser = $I->grabFromCollection('User', ['username' => $this->user['username']]);

        $I->sendPUT('users/' . $anotherUser['_id'] . '.json', $user);
        $I->seeResponseCodeIs(403);

        $I->sendPUT('users/' . $anotherUser['_id'] . '/password.json', $user);
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('users/' . $anotherUser['_id'] . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('users/' . $id . '.json');
        $I->seeResponseCodeIs(204);

        $I->login($this->admin['email'], $this->admin['password']);

        $I->sendGET('users/' . $id . '.json');
        $I->seeResponseCodeIs(404);
    }

    public function tryToGrantAndRevokeAdmin(FunctionalTester $I) {
        $dbUser = $I->grabFromCollection('User', [
            'username' => $this->user['username'],
        ]);

        $user = $this->user;
        $user['id'] = strval($dbUser['_id']);
        unset($user['password']);

        $I->sendPUT('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);
        $I->sendDELETE('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);
        $I->seeResponseCodeIs(200);

        $I->sendPUT('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);
        $I->sendDELETE('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->admin['email'], $this->admin['password']);
        $I->seeResponseCodeIs(200);

        $id = $user['id'];
        unset($user['id']);

        $I->sendPUT('users/' . $id . '/admin.json');
        $I->seeResponseCodeIs(200);
        $I->seeInCollection('User', array_merge($user, ['isAdmin' => true]));

        $I->sendPUT('users/' . $id . '/admin.json');
        $I->seeResponseCodeIs(200);
        $I->seeInCollection('User', array_merge($user, ['isAdmin' => true]));

        $I->sendDELETE('users/' . $id . '/admin.json');
        $I->seeResponseCodeIs(200);
        $I->seeInCollection('User', array_merge($user, ['isAdmin' => false]));

        $I->sendDELETE('users/' . $id . '/admin.json');
        $I->seeResponseCodeIs(200);
        $I->seeInCollection('User', array_merge($user, ['isAdmin' => false]));
    }
}