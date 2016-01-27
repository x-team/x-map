<?php

namespace MapBundle\Security\Authorization\Voter;

use InvalidArgumentException;
use MapBundle\Document\Content;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class ContentVoter implements VoterInterface
{
    public function supportsAttribute($attribute)
    {
        return in_array($attribute, array(
            'view',
            'edit',
            'create',
            'delete',
        ));
    }

    public function supportsClass($class)
    {
        $supportedClass = Content::class;

        return $supportedClass === $class || is_subclass_of($class, $supportedClass);
    }

    public function vote(TokenInterface $token, $content, array $attributes)
    {
        if (!$this->supportsClass(get_class($content))) {
            return VoterInterface::ACCESS_ABSTAIN;
        }

        if (1 !== count($attributes)) {
            throw new InvalidArgumentException(
                'Only one attribute is allowed'
            );
        }

        $attribute = $attributes[0];

        if (!$this->supportsAttribute($attribute)) {
            return VoterInterface::ACCESS_ABSTAIN;
        }

        $authUser = $token->getUser();

        if (!$authUser instanceof UserInterface) {
            return VoterInterface::ACCESS_DENIED;
        }

        switch ($attribute) {
            case 'view':
                if ($authUser->hasRole('ROLE_USER')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case 'create':
            case 'edit':
            case 'delete':
                if ($authUser->hasRole('ROLE_ADMIN')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
        }

        return VoterInterface::ACCESS_DENIED;
    }
}
