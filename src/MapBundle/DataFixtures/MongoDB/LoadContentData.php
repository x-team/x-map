<?php namespace MapBundle\DataFixtures;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MapBundle\Document\Content;

class LoadContentData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $content1 = new Content;\
        $content1->setKey('key1');
        $content1->setTitle('title1');
        $content1->setContent('content1');

        $content2 = new Content;
        $content2->setKey('key2');
        $content2->setTitle('title2');
        $content2->setContent('content2');

        $manager->persist($content1);
        $manager->persist($content2);
        $manager->flush();
    }
}