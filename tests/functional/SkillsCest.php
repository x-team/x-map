<?php

use MapBundle\Document\User;

class SkillsCest
{
    protected $admin = [
        'password' => 'testtest1',
        'email' => 'bob1@test.pl',
        'isAdmin' => true
    ];

    protected $user = [
        'password' => 'testtest2',
        'email' => 'bob2@test.pl',
    ];

    protected $skill1 = [
        'name' => 'name1',
    ];

    protected $skill1Id;

    protected $skill2 = [
        'name' => 'name2',
    ];

    protected $skill2Id;

    protected $skill3 = [
        'name' => 'name3',
    ];

    public function _before(FunctionalTester $I) {
        $this->skill1Id = (string)$I->haveInCollection('Skill', $this->skill1);
        $this->skill2Id = (string)$I->haveInCollection('Skill', $this->skill2);

        unset($this->skill1['_id']);
        unset($this->skill2['_id']);

        $encoder = $I->grabServiceFromContainer('security.password_encoder');
        $I->haveInCollection('User', array_merge($this->user, ['password' => $encoder->encodePassword(new User, $this->user['password'])]));
        $I->haveInCollection('User', array_merge($this->admin, ['password' => $encoder->encodePassword(new User, $this->admin['password'])]));
    }

    public function tryToReadSkill(FunctionalTester $I)
    {
        $I->sendGET('api/skills.json');
        $I->seeResponseCodeIs(403);

        $I->login($this->user['email'], $this->user['password']);

        $I->sendGET('api/skills.json');

        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([$this->skill1, $this->skill2]);

        $I->sendGET('api/skills/' . $this->skill1Id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->skill1);

        $I->sendGET('api/skills/' . uniqid() . '.json');
        $I->seeResponseCodeIs(404);
    }

    public function tryToCreateModifyAndDeleteSkill(FunctionalTester $I)
    {
        $I->am('Anonymous user');

        $I->sendPOST('api/skills.json', $this->skill3);
        $I->seeResponseCodeIs(403);

        $I->sendPUT('api/skills/' .  $this->skill2Id . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('api/skills/' .  $this->skill2Id . '.json');
        $I->seeResponseCodeIs(403);

        $I->am('ROLE_USER');

        $I->login($this->user['email'], $this->user['password']);

        $I->sendPOST('api/skills.json', $this->skill3);
        $I->seeResponseCodeIs(403);

        $I->sendPUT('api/skills/' .  $this->skill2Id . '.json');
        $I->seeResponseCodeIs(403);

        $I->sendDELETE('api/skills/' .  $this->skill2Id . '.json');
        $I->seeResponseCodeIs(403);

        $I->am('ROLE_ADMIN');
        $I->login($this->admin['email'], $this->admin['password']);

        $I->sendPOST('api/skills.json', $this->skill3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->skill3);

        $id = $I->grabDataFromResponseByJsonPath('$.id')[0];

        $I->sendGET('api/skills/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->skill3);

        $I->sendGET('api/skills/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->skill3);

        $this->skill3['name'] = 'new name';
        
        $I->sendPUT('api/skills/' . $id . '.json', $this->skill3);
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->skill3);

        $I->sendGET('api/skills/' . $id . '.json');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson($this->skill3);

        $I->sendDELETE('api/skills/' . $id . '.json');
        $I->seeResponseCodeIs(204);

        $I->sendGET('api/skills/' . $id . '.json');
        $I->seeResponseCodeIs(404);
    }
}