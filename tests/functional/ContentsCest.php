<?php

use MapBundle\Document\User;

class ContentsCest
{
    protected $admin = [
        'username' => 'bobbudowniczy1',
        'password' => 'testtest1',
        'email' => 'bob1@test.pl',
        'isAdmin' => true
    ];

    protected $user = [
        'username' => 'bobbudowniczy2',
        'password' => 'testtest2',
        'email' => 'bob2@test.pl',
    ];

    protected $content1 = [
        'key' => 'keykey1',
        'title' => 'title1',
        'content' => 'content1'
    ];

    protected $content2 = [
        'key' => 'keykey2',
        'title' => 'title2',
        'content' => 'content2'
    ];

    protected $content3 = [
        'key' => 'keykey3',
        'title' => 'title3',
        'content' => 'content3'
    ];

    public function _before(FunctionalTester $I) {
        $I->haveInCollection('Content', $this->content1);
        $I->haveInCollection('Content', $this->content2);

        unset($this->content1['_id']);
        unset($this->content2['_id']);

        $encoder = $I->grabServiceFromContainer('security.password_encoder');
        $I->haveInCollection('User', array_merge($this->user, ['password' => $encoder->encodePassword(new User, $this->user['password'])]));
        $I->haveInCollection('User', array_merge($this->admin, ['password' => $encoder->encodePassword(new User, $this->admin['password'])]));
    }

    public function tryToReadContent(FunctionalTester $I)
    {
        $I->sendGET('contents.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);

        $I->sendGET('contents.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([$this->content1, $this->content2]);

        $I->sendGET('contents/' . $this->content1['key'] . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->content1);

        $I->sendGET('contents/' . $this->content3['key'] . '.json');
        $I->seeResponseCodeIs(404);
    }

    public function tryToCreateModifyAndDeleteContent(FunctionalTester $I)
    {
        $I->am('Anonymous user');

        $I->sendPOST('contents.json', $this->content3);
        $I->seeResponseCodeIs(403);

        $I->sendPUT('contents/' .  $this->content2['key'] . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('contents/' .  $this->content2['key'] . '.json');
        $I->seeResponseCodeIs(403);

        $I->am('ROLE_USER');

        $I->login($this->user['email'], $this->user['password']);

        $I->sendPOST('contents.json', $this->content3);
        $I->seeResponseCodeIs(403);

        $I->sendPUT('contents/' .  $this->content2['key'] . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('contents/' .  $this->content2['key'] . '.json');
        $I->seeResponseCodeIs(403);

        $I->am('ROLE_ADMIN');
        $I->login($this->admin['email'], $this->admin['password']);
        $I->seeResponseCodeIs(200);

        $I->sendPOST('contents.json', $this->content3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->content3);

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendGET('contents/' . $this->content3['key'] . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->content3);

        $I->sendGET('contents/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->content3);

        $this->content3['title'] = 'new title';
        
        $I->sendPUT('contents/' . $id . '.json', $this->content3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->content3);

        $I->sendGET('contents/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->content3);

        $I->sendDELETE('contents/' . $id . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('contents/' . $id . '.json');
        $I->seeResponseCodeIs(404);
    }
}