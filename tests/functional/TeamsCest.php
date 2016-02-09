<?php

class TeamsCest
{
    protected $admin = [
        'email' => 'bob1@test.pl',
        'isAdmin' => true,
    ];

    protected $user = [
        'email' => 'bob2@test.pl',
    ];

    protected $team1 = [
        'name' => 'namename1',
        'summary' => 'summary1',
    ];

    protected $team1Id;

    protected $team2 = [
        'name' => 'namename2',
        'summary' => 'summary3',
    ];

    protected $team2Id;

    protected $team3 = [
        'name' => 'namename3',
        'summary' => 'summary3',
    ];

    public function _before(FunctionalTester $I)
    {
        $this->team1Id = (string) $I->haveInCollection('Team', $this->team1);
        $this->team2Id = (string) $I->haveInCollection('Team', $this->team2);

        unset($this->team1['_id']);
        unset($this->team2['_id']);

        $I->haveInCollection('User', $this->user);
        $I->haveInCollection('User', $this->admin);
    }

    public function tryToReadTeam(FunctionalTester $I)
    {
        $I->sendGET('api/teams.json');
        $I->seeResponseCodeIs(401);

        $I->login($this->user['email']);

        $I->sendGET('api/teams.json');

        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([$this->team1, $this->team2]);

        $I->sendGET('api/teams/'.$this->team1Id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->team1);

        $I->sendGET('api/teams/'.uniqid().'.json');
        $I->seeResponseCodeIs(404);
    }

    public function tryToCreateModifyAndDeleteTeam(FunctionalTester $I)
    {
        $I->am('Anonymous user');

        $I->sendPOST('api/teams.json', $this->team3);
        $I->seeResponseCodeIs(401);

        $I->sendPUT('api/teams/'.$this->team2Id.'.json');
        $I->seeResponseCodeIs(401);

        $I->sendDELETE('api/teams/'.$this->team2Id.'.json');
        $I->seeResponseCodeIs(401);

        $I->am('ROLE_USER');

        $I->login($this->user['email']);

        $I->sendPOST('api/teams.json', $this->team3);
        $I->seeResponseCodeIs(403);

        $I->sendPUT('api/teams/'.$this->team2Id.'.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('api/teams/'.$this->team2Id.'.json');
        $I->seeResponseCodeIs(403);

        $I->am('ROLE_ADMIN');
        $I->login($this->admin['email']);

        $I->sendPOST('api/teams.json', $this->team3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->team3);

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendGET('api/teams/'.$id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->team3);

        $I->sendGET('api/teams/'.$id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->team3);

        $this->team3['name'] = 'new name';

        $I->sendPUT('api/teams/'.$id.'.json', $this->team3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->team3);

        $I->sendGET('api/teams/'.$id.'.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->team3);

        $I->sendDELETE('api/teams/'.$id.'.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('api/teams/'.$id.'.json');
        $I->seeResponseCodeIs(404);
    }
}
