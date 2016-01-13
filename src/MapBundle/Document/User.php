<?php namespace MapBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Bundle\MongoDBBundle\Validator\Constraints\Unique as MongoDBUnique;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @MongoDB\Document
 * @MongoDBUnique(fields="email")
 * @MongoDBUnique(fields="username")
 */
class User implements UserInterface {

    /**
     * @MongoDB\Id(strategy="auto")
     */
    protected $id;

    /**
     * @MongoDB\String
     * @Assert\NotBlank
     * @Assert\Length(min=6,max=32)
     */
    protected $username;

    /**
     * @MongoDB\String
     * @Assert\NotBlank
     * @Assert\Length(min=6)
     * @Serializer\Exclude
     */
    protected $password;

    /**
     * @MongoDB\String
     * @Assert\Email
     * @Assert\NotBlank
     */
    protected $email;

    /**
     * @MongoDB\String
     * @Assert\Length(max=1024)
     */
    protected $aboutMe;

    /**
     * @MongoDB\String
     * @Assert\Length(max=64)
     */
    protected $skypeId;

    /**
     * @MongoDB\String
     * @Assert\Length(max=64)
     */
    protected $nationality;

    /**
     * @MongoDB\Boolean
     */
    protected $isAdmin;

    /**
     * @MongoDB\String
     * @Assert\Url
     */
    protected $website;

    /**
     * @MongoDB\Float
     */
    protected $lat;

    /**
     * @MongoDB\Float
     */
    protected $lng;

    /**
     * @MongoDB\Collection
     * @MongoDB\ReferenceMany(targetDocument="MapBundle\Document\Team", mappedBy="users")
     */
    protected $teams;

    /**
     * @MongoDB\Collection
     * @MongoDB\ReferenceMany(targetDocument="MapBundle\Document\Skill", mappedBy="users")
     */
    protected $skills;


    public function __construct() {
        $this->teams = new ArrayCollection();
        $this->skills = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return self
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * Get username
     *
     * @return string $username
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return self
     */
    public function setPassword($password)
    {
        $this->password = $password;
        return $this;
    }

    /**
     * Get password
     *
     * @return string $password
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return self
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Get email
     *
     * @return string $email
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set aboutMe
     *
     * @param string $aboutMe
     * @return self
     */
    public function setAboutMe($aboutMe)
    {
        $this->aboutMe = $aboutMe;
        return $this;
    }

    /**
     * Get aboutMe
     *
     * @return string $aboutMe
     */
    public function getAboutMe()
    {
        return $this->aboutMe;
    }

    /**
     * Set skypeId
     *
     * @param string $skypeId
     * @return self
     */
    public function setSkypeId($skypeId)
    {
        $this->skypeId = $skypeId;
        return $this;
    }

    /**
     * Get skypeId
     *
     * @return string $skypeId
     */
    public function getSkypeId()
    {
        return $this->skypeId;
    }

    /**
     * Set isAdmin
     *
     * @param string $isAdmin
     * @return self
     */
    public function setIsAdmin($isAdmin)
    {
        $this->isAdmin = $isAdmin;
        return $this;
    }

    /**
     * Get isAdmin
     *
     * @return string $isAdmin
     */
    public function getIsAdmin()
    {
        return $this->isAdmin;
    }

    /**
     * Set website
     *
     * @param string $website
     * @return self
     */
    public function setWebsite($website)
    {
        $this->website = $website;
        return $this;
    }

    /**
     * Get website
     *
     * @return string $website
     */
    public function getWebsite()
    {
        return $this->website;
    }

    public function getRoles()
    {
        return $this->getIsAdmin() ? ['ROLE_ADMIN'] : ['ROLE_USER'];
    }

    public function hasRole($role) {
        return in_array($role, $this->getRoles());
    }

    /**
     * Set teams
     *
     * @param collection $teams
     * @return self
     */
    public function setTeams($teams)
    {
        $this->teams = $teams;
        return $this;
    }

    /**
     * Get teams
     *
     * @return collection $teams
     */
    public function getTeams()
    {
        return $this->teams;
    }

    public function addTeam(Team $team) {
        $this->teams[] = $team;
    }

    public function removeTeam(Team $team) {
        $this->teams->removeElement($team);
    }

    /**
     * Set lat
     *
     * @param float $lat
     * @return self
     */
    public function setLat($lat)
    {
        $this->lat = $lat;
        return $this;
    }

    /**
     * Get lat
     *
     * @return float $lat
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lng
     *
     * @param float $lng
     * @return self
     */
    public function setLng($lng)
    {
        $this->lng = $lng;
        return $this;
    }

    /**
     * Get lng
     *
     * @return float $lng
     */
    public function getLng()
    {
        return $this->lng;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
    }

    /**
     * Set nationality
     *
     * @param string $nationality
     * @return self
     */
    public function setNationality($nationality)
    {
        $this->nationality = $nationality;
        return $this;
    }

    /**
     * Get nationality
     *
     * @return string $nationality
     */
    public function getNationality()
    {
        return $this->nationality;
    }

    /**
     * Add skill
     *
     * @param Skill $skill
     */
    public function addSkill(Skill $skill)
    {
        $this->skills[] = $skill;
    }

    /**
     * Remove skill
     *
     * @param Skill $skill
     */
    public function removeSkill(Skill $skill)
    {
        $this->skills->removeElement($skill);
    }

    /**
     * Get skills
     *
     * @return \Doctrine\Common\Collections\Collection $skills
     */
    public function getSkills()
    {
        return $this->skills;
    }
}
