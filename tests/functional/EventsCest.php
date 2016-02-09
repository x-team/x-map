<?php

class EventsCest
{
    protected $admin = [
        'email' => 'bob1@test.pl',
        'isAdmin' => true,
    ];

    protected $user = [
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
        'type' => 'conference',
    ];

    public function _before(FunctionalTester $I)
    {
        $this->event1['dateStart'] = (new DateTime())->modify('-1 week')->format('Y-m-d');
        $this->event2['dateStart'] = (new DateTime())->modify('+1 week')->format('Y-m-d');
        $this->event2['dateEnd'] = (new DateTime())->modify('+2 week')->format('Y-m-d');
        $this->event3['dateStart'] = (new DateTime())->modify('+4 week')->format('Y-m-d');
        $this->event3['dateEnd'] = (new DateTime())->modify('+5 week')->format('Y-m-d');
        $this->event4['dateStart'] = (new DateTime())->modify('+4 week')->format('Y-m-d');

        $this->event1Id = (string) $I->haveInCollection('Event', $this->event1);
        $this->event2Id = (string) $I->haveInCollection('Event', $this->event2);

        unset($this->event1['_id']);
        unset($this->event2['_id']);

        $I->haveInCollection('User', $this->user);
        $I->haveInCollection('User', $this->admin);
    }

    public function tryToReadEvent(FunctionalTester $I)
    {
        $I->sendGET('api/events.json');
        $I->seeResponseCodeIs(401);

        $I->login($this->user['email']);

        $I->sendGET('api/events.json');

        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([$this->event1, $this->event2]);

        $I->sendGET('api/events/'.$this->event1Id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event1);

        $I->sendGET('api/events/'.uniqid().'.json');
        $I->seeResponseCodeIs(404);
    }

    public function tryToCreateModifyAndDeleteEvent(FunctionalTester $I)
    {
        $I->am('Anonymous user');

        $I->sendPOST('api/events.json', $this->event3);
        $I->seeResponseCodeIs(401);

        $I->sendPUT('api/events/'.$this->event2Id.'.json');
        $I->seeResponseCodeIs(401);

        $I->sendDELETE('api/events/'.$this->event2Id.'.json');
        $I->seeResponseCodeIs(401);

        $I->am('ROLE_USER');

        $I->login($this->user['email']);

        $I->sendPOST('api/events.json', $this->event3);
        $I->seeResponseCodeIs(400);

        $this->event3['type'] = 'conference';

        $I->sendPOST('api/events.json', $this->event3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendGET('api/events/'.$id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $this->event3['name'] = 'new name';

        $I->sendPUT('api/events/'.$id.'.json', $this->event3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $I->sendGET('api/events/'.$id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event3);

        $I->sendDELETE('api/events/'.$id.'.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('api/events/'.$id.'.json');
        $I->seeResponseCodeIs(404);

        $I->sendPOST('api/events.json', $this->event4);
        $I->seeResponseCodeIs(200);
        $this->event4['dateEnd'] = $this->event4['dateStart'];
        $I->seeResponseContainsJson($this->event4);

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $this->event4['data'] = ['some' => ['custom', 'data'], 'to' => ['check' => 'if arbitrary data can be stored']];
        $I->sendPUT('api/events/'.$id.'.json', $this->event4);

        $I->sendGET('api/events/'.$id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->event4);
    }
}
