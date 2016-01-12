<?php namespace MapBundle\Validator\Constraints;

use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\AbstractComparisonValidator;

/**
 * Validates original value is equal to encoded value that was provided
 */
class EncodedEqualToValidator extends AbstractComparisonValidator
{
    protected $encoder;

    public function __construct(PasswordEncoderInterface $encoder) {
        $this->encoder = $encoder;
    }

    protected function compareValues($new, $original)
    {
        return $this->encoder->isPasswordValid($original, $new, null);
    }
}
