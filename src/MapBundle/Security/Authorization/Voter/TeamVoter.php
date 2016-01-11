<?php namespace MapBundle\Security\Authorization\Voter;

use InvalidArgumentException;
use MapBundle\Document\Team;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class TeamVoter implements VoterInterface
{
    const VIEW = 'view';
    const EDIT = 'edit';
    const CREATE = 'create';
    const LINK = 'link';
    const JOIN = 'join';

    public function supportsAttribute($attribute)
    {
        return in_array($attribute, array(
            self::VIEW,
            self::EDIT,
            self::CREATE,
            self::LINK,
            self::JOIN
        ));
    }

    public function supportsClass($class)
    {
        $supportedClass = Team::class;

        return $supportedClass === $class || is_subclass_of($class, $supportedClass);
    }

    public function vote(TokenInterface $token, $team, array $attributes)
    {
        if (!$this->supportsClass(get_class($team))) {
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
            case self::JOIN:
                if (($authUser->hasRole('ROLE_ORGANIZATION_ADMIN') || $authUser->hasRole('ROLE_USER')) && $authUser->getOrganization() == $team->getOrganization()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case self::EDIT:
            case self::CREATE:
                //ToDo: check if the same organization
                if ($authUser->hasRole('ROLE_ORGANIZATION_ADMIN')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case self::LINK:
                if ($authUser->hasRole('ROLE_ORGANIZATION_ADMIN') && $authUser->getOrganization() == $team->getOrganization()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
        }

        return VoterInterface::ACCESS_DENIED;
    }
}
