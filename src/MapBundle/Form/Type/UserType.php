<?php

namespace MapBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

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
            ->add('role')
            ->add('lat')
            ->add('lng')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults([
            'validation_groups' => ['Default', 'registration'],
        ]);
    }
}
