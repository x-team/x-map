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
            ->add('nationality')
            ->add('website')
            ->add('lat')
            ->add('lng')
        ;
    }

    public function getName()
    {
        return '';
    }
}