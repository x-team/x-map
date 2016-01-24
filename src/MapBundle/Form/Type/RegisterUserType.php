<?php namespace MapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;

class RegisterUserType extends BaseAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email')
            ->add('password')
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