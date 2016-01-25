<?php namespace MapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;

class ContentType extends BaseAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('key')
            ->add('title')
            ->add('content')
        ;
    }
}