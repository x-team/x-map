<?php namespace MapBundle\Security\Authorization\Voter;

use InvalidArgumentException;
use MapBundle\Document\User;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter implements VoterInterface
{
    const VIEW = 'view';
    const EDIT = 'edit';
    const EDIT_ADMIN = 'edit_admin';
    const EDIT_PASSWORD = 'edit_password';

    public function supportsAttribute($attribute)
    {
        return in_array($attribute, array(
            self::VIEW,
            self::EDIT,
            self::EDIT_ADMIN,
            self::EDIT_PASSWORD
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
            return VoterInterface::ACCESS_DENIED;
        }

        switch ($attribute) {
            case self::VIEW:
                if ($authUser->hasRole('ROLE_USER')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case self::EDIT:
                if ($authUser->hasRole('ROLE_ADMIN') || $user->getId() === $authUser->getId()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case self::EDIT_PASSWORD:
                if ($user->getId() === $authUser->getId()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case self::EDIT_ADMIN:
                if ($authUser->hasRole('ROLE_ADMIN')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
        }

        return VoterInterface::ACCESS_DENIED;
    }
}
