<?php

use MapBundle\Document\User;

class EventsCest
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

    protected $event1 = [
        'name' => 'conference1',
        'type' => 'conference',
    ];

    protected $event1Id;

    protected $event2 = [
        'name' => 'conference2',
        'type' => 'conference',
    ];

    protected $event2Id;

    protected $event3 = [
        'name' => 'conference3',
    ];

    protected $event4 = [
        'name' => 'conference4',
        'type' => 'conference'
    ];

    public function _before(FunctionalTester $I) {
        $this->event1['dateStart'] = (new DateTime)->modify('-1 week')->format('Y-m-d');
        $this->event2['dateStart'] = (new DateTime)->modify('+1 week')->format('Y-m-d');
        $this->event2['dateEnd'] = (new DateTime)->modify('+2 week')->format('Y-m-d');
        $this->event3['dateStart'] = (new DateTime)->modify('+4 week')->format('Y-m-d');
        $this->event3['dateEnd'] = (new DateTime)->modify('+5 week')->format('Y-m-d');
        $this->event4['dateStart'] = (new DateTime)->modify('+4 week')->format('Y-m-d');

        $this->event1Id = (string)$I->haveInCollection('Event', $this->event1);
        $this->event2Id = (string)$I->haveInCollection('Event', $this->event2);

        unset($this->event1['_id']);
        unset($this->event2['_id']);

        $encoder = $I->grabServiceFromContainer('security.password_encoder');
        $I->haveInCollection('User', array_merge($this->user, ['password' => $encoder->encodePassword(new User, $this->user['password'])]));
        $I->haveInCollection('User', array_merge($this->admin, ['password' => $encoder->encodePassword(new User, $this->admin['password'])]));
    }

    public function tryToReadEvent(FunctionalTester $I)
    {
        $I->sendGET('events.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);

        $I->sendGET('events.json');

        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([$this->event1, $this->event2]);

        $I->sendGET('events/' . $this->event1Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event1);

        $I->sendGET('events/' . uniqid() . '.json');
        $I->seeResponseCodeIs(404);
    }

    public function tryToCreateModifyAndDeleteEvent(FunctionalTester $I)
    {
        $I->am('Anonymous user');

        $I->sendPOST('events.json', $this->event3);
        $I->seeResponseCodeIs(403);

        $I->sendPUT('events/' .  $this->event2Id . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('events/' .  $this->event2Id . '.json');
        $I->seeResponseCodeIs(403);

        $I->am('ROLE_USER');

        $I->login($this->user['email'], $this->user['password']);

        $I->sendPOST('events.json', $this->event3);
        $I->seeResponseCodeIs(400);

        $this->event3['type'] = 'conference';

        $I->sendPOST('events.json', $this->event3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendGET('events/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $this->event3['name'] = 'new name';
        
        $I->sendPUT('events/' . $id . '.json', $this->event3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $I->sendGET('events/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $I->sendDELETE('events/' . $id . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('events/' . $id . '.json');
        $I->seeResponseCodeIs(404);

        $I->sendPOST('events.json', $this->event4);
        $I->seeResponseCodeIs(200);
        $this->event4['dateEnd'] = $this->event4['dateStart'];
        $I->seeResponseContainsJson($this->event4);

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $this->event4['data'] = ['some' => ['custom', 'data'], 'to' => ['check' => 'if arbitrary data can be stored']];
        $I->sendPUT('events/' . $id . '.json', $this->event4);

        $I->sendGET('events/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event4);
    }
}