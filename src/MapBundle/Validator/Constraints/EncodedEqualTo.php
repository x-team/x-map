<?php

namespace MapBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraints\AbstractComparison;
use Symfony\Component\Validator\Exception\MissingOptionsException;

/**
 * @Annotation
 * @Target({"PROPERTY", "METHOD", "ANNOTATION"})
 */
class EncodedEqualTo extends AbstractComparison
{
    public $message = 'Provided value does not match original value';

    public $value;

    public function __construct($options = null)
    {
        parent::__construct($options);

        if (null === $this->value) {
            throw new MissingOptionsException(sprintf('Missing original value for %s', __CLASS__), array('original'));
        }
    }

    public function validatedBy()
    {
        return 'encoded_equal_to';
    }
}
