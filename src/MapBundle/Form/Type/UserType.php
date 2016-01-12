<?php namespace MapBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('aboutMe')
            ->add('skypeId')
            ->add('country')
            ->add('city')
            ->add('website')
            //->add('password')
            ->add('lat')
            ->add('lng')
        ;
    }

    public function getName()
    {
        return '';
    }
}