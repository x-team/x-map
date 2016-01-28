<?php

namespace MapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;

class LoginType extends BaseAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email')
            ->add('password')
        ;
    }
}
