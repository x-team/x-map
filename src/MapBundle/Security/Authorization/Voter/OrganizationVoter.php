<?php namespace MapBundle\Security\Authorization\Voter;

use InvalidArgumentException;
use MapBundle\Document\Organization;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class OrganizationVoter implements VoterInterface
{
    const VIEW = 'view';
    const EDIT = 'edit';
    const CREATE = 'create';
    const LINK = 'link';

    public function supportsAttribute($attribute)
    {
        return in_array($attribute, array(
            self::VIEW,
            self::EDIT,
            self::CREATE,
            self::LINK
        ));
    }

    public function supportsClass($class)
    {
        $supportedClass = Organization::class;

        return $supportedClass === $class || is_subclass_of($class, $supportedClass);
    }

    public function vote(TokenInterface $token, $organization, array $attributes)
    {
        if (!$this->supportsClass(get_class($organization))) {
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
                if ($authUser->hasRole('ROLE_ADMIN') || $authUser->hasRole('ROLE_USER') && $authUser->getOrganization() == $organization->getId()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case self::EDIT:
            case self::LINK:
            if ($authUser->hasRole('ROLE_ADMIN') || $authUser->hasRole('ROLE_ORGANIZATION_ADMIN') && $authUser->getOrganization() == $organization->getId()) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
            case self::CREATE:
                if ($authUser->hasRole('ROLE_ADMIN')) {
                    return VoterInterface::ACCESS_GRANTED;
                }
                break;
        }

        return VoterInterface::ACCESS_DENIED;
    }
}
