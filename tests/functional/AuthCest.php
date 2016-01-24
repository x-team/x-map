<?php

use MapBundle\Document\User;

class AuthCest
{
    protected $user1 = [
        'password' => 'testtest1',
        'email' => 'bob1@test.pl',
    ];

    protected $user2 = [
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
        $I->sendPOST('api/logins.json', ['email' => $this->user1['email'], 'password' => $this->user2['password']]);
        $I->seeResponseCodeIs(400);

        $I->sendPOST('api/logins.json', ['email' => $this->user1['email'], 'password' => $this->user1['password']]);
        $I->seeResponseCodeIs(200);

        $id1 = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendPOST('api/logins.json', ['email' => $this->user2['email'], 'password' => $this->user2['password']]);
        $I->seeResponseCodeIs(200);

        $id2 = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendPUT('api/users/' . $id1 . '/password.json');
        $I->seeResponseCodeIs(403);

        $I->sendPUT('api/users/' . $id2 . '/password.json');
        $I->seeResponseCodeIs(400);

        $I->sendPOST('api/logouts.json');
        $I->seeResponseCodeIs(204);

        $I->sendPUT('api/users/' . $id1 . '/password.json');
        $I->seeResponseCodeIs(403);

        $I->sendPUT('api/users/' . $id2 . '/password.json');
        $I->seeResponseCodeIs(403);
    }
}