<?php namespace MapBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('type')
            ->add('dateStart', 'date', ['widget' => 'single_text'])
            ->add('dateEnd', 'date', ['widget' => 'single_text'])
            ->add('data', null, ['required' => false])
        ;
    }

    public function getName()
    {
        return '';
    }
}