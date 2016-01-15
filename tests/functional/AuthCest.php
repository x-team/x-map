<?php

use MapBundle\Document\User;

class AuthCest
{
    protected $user1 = [
        'username' => 'bobbudowniczy1',
        'password' => 'testtest1',
        'email' => 'bob1@test.pl',
    ];

    protected $user2 = [
        'username' => 'bobbudowniczy2',
        'password' => 'testtest2',
        'email' => 'bob2@test.pl',
    ];

    public function _before(FunctionalTester $I) {
        $encoder = $I->grabServiceFromContainer('security.password_encoder');
        $I->haveInCollection('User', array_merge($this->user1, ['password' => $encoder->encodePassword(new User, $this->user1['password'])]));
        $I->haveInCollection('User', array_merge($this->user2, ['password' => $encoder->encodePassword(new User, $this->user2['password'])]));
    }

    public function tryToLoginAndLogout(FunctionalTester $I)
    {
        $I->login($this->user1['email'], $this->user2['password']);
        $I->seeResponseCodeIs(400);

        $I->login($this->user1['email'], $this->user1['password']);
        $I->seeResponseCodeIs(200);

        $id1 = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->login($this->user2['email'], $this->user2['password']);
        $I->seeResponseCodeIs(200);

        $id2 = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendPUT('users/' . $id1 . '/password.json');
        $I->seeResponseCodeIs(403);

        $I->sendPUT('users/' . $id2 . '/password.json');
        $I->seeResponseCodeIs(400);

        $I->logout();
        $I->seeResponseCodeIs(204);

        $I->sendPUT('users/' . $id1 . '/password.json');
        $I->seeResponseCodeIs(403);

        $I->sendPUT('users/' . $id2 . '/password.json');
        $I->seeResponseCodeIs(403);
    }
}