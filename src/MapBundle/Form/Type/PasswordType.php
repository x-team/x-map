<?php namespace MapBundle\Form\Type;

use MapBundle\Validator\Constraints\EncodedEqualTo;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints as Assert;

class PasswordType extends BaseAbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('password')
            ->add('old_password', 'password', array('mapped' => false, 'constraints' => isset($options['data']) ? [
                new EncodedEqualTo(array('value' => $options['data']->getPassword()))
            ] : []));
        ;
    }
}