<?php namespace MapBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class RegisterUserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username')
            ->add('password')
            ->add('email')
            ->add('aboutMe')
            ->add('skypeId')
            ->add('nationality')
            ->add('website')
            ->add('lat', 'float')
            ->add('lng', 'float')
        ;
    }

    public function getName()
    {
        return '';
    }
}