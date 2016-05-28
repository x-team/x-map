<?php

namespace MapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;

class EventType extends BaseAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('description')
            ->add('type')
            ->add('dateStart', 'date', ['widget' => 'single_text'])
            ->add('dateEnd', 'date', ['widget' => 'single_text'])
            ->add('data', null, ['required' => false])
        ;
    }
}
