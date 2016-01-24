<?php namespace MapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;

class UserType extends BaseAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName')
            ->add('lastName')
            ->add('aboutMe')
            ->add('skypeId')
            ->add('slackId')
            ->add('nationality')
            ->add('website')
            ->add('lat')
            ->add('lng')
        ;
    }
}