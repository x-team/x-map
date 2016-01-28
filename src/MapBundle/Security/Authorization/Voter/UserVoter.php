<?php

namespace MapBundle\Security\Authorization\Voter;

use InvalidArgumentException;
use MapBundle\Document\User;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter implements VoterInterface
{
    public function supportsAttribute($attribute)
    {
        return in_array($attribute, array(
            'view',
            'edit',
            'create',
            'delete',
            'edit_admin',
            'edit_password',
            'link_event',
            'unlink_event',
            'link_skill',
            'unlink_skill',
            'link_team',
            'unlink_team',
        ));
    }

    public function supportsClass($class)
    {
        $supportedClass = User::class;

        return $supportedClass === $class || is_subclass_of($class, $supportedClass);
    }

    public function vote(TokenInterface $token, $user, array $attributes)
    {
        if (!$this->supportsClass(get_class($user))) {
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
            return $attribute === 'create' ? VoterInterface::ACCESS_GRANTED : VoterInterface::ACCESS_DENIED;
        }

        switch ($attribute) {
            case 'view':
                if ($authUser->hasRole('ROLE_USER')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case 'edit':
            case 'edit_password':
            case 'delete':
                if ($authUser->hasRole('ROLE_ADMIN') || $authUser->getId() == $user->getId()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case 'edit_admin':
                if ($authUser->hasRole('ROLE_ADMIN')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case 'link_team':
            case 'unlink_team':
            case 'link_skill':
            case 'unlink_skill':
                if ($authUser->hasRole('ROLE_ADMIN') || $authUser->getId() == $user->getId()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case 'link_event':
            case 'unlink_event':
                if ($authUser->hasRole('ROLE_USER')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
        }

        return VoterInterface::ACCESS_DENIED;
    }
}
