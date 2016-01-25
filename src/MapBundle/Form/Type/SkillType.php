<?php namespace MapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;

class SkillType extends BaseAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
        ;
    }
}