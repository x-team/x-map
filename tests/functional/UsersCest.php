<?php

use MapBundle\Document\User;

class UsersCest
{
    protected $user = [
        'username' => 'bobbudowniczy1',
        'password' => 'testtest1',
        'email'    => 'bob1@test.pl',
    ];

    protected $userId;

    protected $admin = [
        'username' => 'admin',
        'password' => 'admin',
        'email'    => 'admin@test.pl',
        'isAdmin'  => true
    ];

    protected $adminId;

    public function _before(FunctionalTester $I)
    {
        $encoder = $I->grabServiceFromContainer('security.password_encoder');
        $I->haveInCollection('User', array_merge($this->user, ['password' => $encoder->encodePassword(new User, $this->user['password'])]));
        $this->userId = (string)$I->grabFromCollection('User', ['username' => $this->user['username']])['_id'];
        $I->haveInCollection('User', array_merge($this->admin, ['password' => $encoder->encodePassword(new User, $this->admin['password'])]));
        $this->adminId = (string)$I->grabFromCollection('User', ['username' => $this->admin['username']])['_id'];
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
        $I->dontseeResponseContains('password');

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->login($user['email'], 'testtest');
        $I->seeResponseCodeIs(200);

        $I->sendGET('users/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(array_merge(['id' => $id], $user));
        $I->dontseeResponseContains('password');

        $I->sendGET('users/current.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(array_merge(['id' => $id], $user));
        $I->dontseeResponseContains('password');

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

    public function tryToGrantAndRevokeAdmin(FunctionalTester $I)
    {
        $user = $this->user;
        $user['id'] = $this->userId;
        unset($user['password']);

        $I->sendPUT('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);
        $I->sendDELETE('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);

        $I->sendPUT('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);
        $I->sendDELETE('users/' . $user['id'] . '/admin.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->admin['email'], $this->admin['password']);

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

    public function tryToLinkUnlinkSkills(FunctionalTester $I)
    {
        $I->haveInCollection('Skill', ['name' => 'skill1']);
        $skill1Id = (string)$dbUser = $I->grabFromCollection('Skill', ['name' => 'skill1'])['_id'];
        $I->haveInCollection('Skill', ['name' => 'skill2']);
        $skill2Id = (string)$dbUser = $I->grabFromCollection('Skill', ['name' => 'skill2'])['_id'];

        $I->sendPUT('skills/' . $skill1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('skills/' . $skill1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);

        $I->sendPUT('skills/' . $skill1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseContainsJson(['skills' => ['id' => $skill1Id]]);
        $I->dontseeResponseContainsJson(['skills' => ['id' => $skill2Id]]);

        $I->sendPUT('skills/' . $skill2Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseContainsJson(['skills' => ['id' => $skill1Id]]);
        $I->seeResponseContainsJson(['skills' => ['id' => $skill2Id]]);

        $I->sendDELETE('skills/' . $skill1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseCodeIs(200);
        $I->dontseeResponseContainsJson(['skills' => ['id' => $skill1Id]]);
        $I->seeResponseContainsJson(['skills' => ['id' => $skill2Id]]);

        $I->sendGET('skills/' . $skill1Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->dontseeResponseContainsJson(['users' => ['id' => $this->userId]]);

        $I->sendGET('skills/' . $skill2Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(['users' => ['id' => $this->userId]]);

        $I->sendPUT('skills/' . $skill2Id . '/users/' . $this->adminId . '.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->admin['email'], $this->admin['password']);

        $I->sendPUT('skills/' . $skill2Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);
    }

    public function tryToLinkUnlinkTeams(FunctionalTester $I)
    {
        $I->haveInCollection('Team', ['name' => 'team1']);
        $team1Id = (string)$dbUser = $I->grabFromCollection('Team', ['name' => 'team1'])['_id'];
        $I->haveInCollection('Team', ['name' => 'team2']);
        $team2Id = (string)$dbUser = $I->grabFromCollection('Team', ['name' => 'team2'])['_id'];

        $I->sendPUT('teams/' . $team1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('teams/' . $team1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);

        $I->sendPUT('teams/' . $team1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseContainsJson(['teams' => ['id' => $team1Id]]);
        $I->dontseeResponseContainsJson(['teams' => ['id' => $team2Id]]);

        $I->sendPUT('teams/' . $team2Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseContainsJson(['teams' => ['id' => $team1Id]]);
        $I->seeResponseContainsJson(['teams' => ['id' => $team2Id]]);

        $I->sendDELETE('teams/' . $team1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseCodeIs(200);
        $I->dontseeResponseContainsJson(['teams' => ['id' => $team1Id]]);
        $I->seeResponseContainsJson(['teams' => ['id' => $team2Id]]);

        $I->sendGET('teams/' . $team1Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->dontseeResponseContainsJson(['users' => ['id' => $this->userId]]);

        $I->sendGET('teams/' . $team2Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(['users' => ['id' => $this->userId]]);

        $I->sendPUT('teams/' . $team2Id . '/users/' . $this->adminId . '.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->admin['email'], $this->admin['password']);

        $I->sendPUT('teams/' . $team2Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);
    }

    public function tryToLinkUnlinkEvents(FunctionalTester $I)
    {
        $I->haveInCollection('Event', ['name' => 'event1']);
        $event1Id = (string)$dbUser = $I->grabFromCollection('Event', ['name' => 'event1'])['_id'];
        $I->haveInCollection('Event', ['name' => 'event2']);
        $event2Id = (string)$dbUser = $I->grabFromCollection('Event', ['name' => 'event2'])['_id'];

        $I->sendPUT('events/' . $event1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('events/' . $event1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);

        $I->sendPUT('events/' . $event1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseContainsJson(['events' => [['id' => $event1Id]]]);
        $I->dontseeResponseContainsJson(['events' => [['id' => $event2Id]]]);

        $I->sendPUT('events/' . $event2Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseContainsJson(['events' => [['id' => $event1Id]]]);
        $I->seeResponseContainsJson(['events' => [['id' => $event2Id]]]);

        $I->sendDELETE('events/' . $event1Id . '/users/' . $this->userId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('users/current.json');
        $I->seeResponseCodeIs(200);
        $I->dontseeResponseContainsJson(['events' => [['id' => $event1Id]]]);
        $I->seeResponseContainsJson(['events' => [['id' => $event2Id]]]);

        $I->sendGET('events/' . $event1Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->dontseeResponseContainsJson(['users' => [['id' => $this->userId]]]);

        $I->sendGET('events/' . $event2Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(['users' => [['id' => $this->userId]]]);

        $I->sendPUT('events/' . $event2Id . '/users/' . $this->adminId . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('events/' . $event2Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson(['users' => [['id' => $this->userId], ['id' => $this->adminId]]]);
    }
}