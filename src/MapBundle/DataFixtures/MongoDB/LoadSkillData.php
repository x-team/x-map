<?php

namespace MapBundle\DataFixtures;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MapBundle\Document\Skill;

class LoadSkillData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $skill1 = new Skill();
        $skill1->setName('skill1');

        $skill2 = new Skill();
        $skill2->setName('skill2');

        $manager->persist($skill1);
        $manager->persist($skill2);
        $manager->flush();
    }

    public function getOrder()
    {
        return 1;
    }
}
