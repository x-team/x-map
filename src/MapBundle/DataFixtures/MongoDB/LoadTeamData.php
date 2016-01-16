<?php namespace MapBundle\DataFixtures;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MapBundle\Document\Team;

class LoadTeamData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $team1 = new Team;
        $team1->setName('team1');

        $team2 = new Team;
        $team2->setName('team2');

        $manager->persist($team1);
        $manager->persist($team2);
        $manager->flush();
    }

    public function getOrder()
    {
        return 1;
    }
}