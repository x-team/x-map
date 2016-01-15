<?php namespace MapBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Bundle\MongoDBBundle\Validator\Constraints\Unique as MongoDBUnique;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @MongoDB\Document
 * @MongoDBUnique(fields="name")
 * @MongoDB\HasLifecycleCallbacks
 */
class Skill {

    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\String
     * @Assert\NotBlank
     * @Assert\Length(min=3,max=64)
     */
    protected $name;

    /**
     * @MongoDB\Collection
     * @MongoDB\ReferenceMany(targetDocument="MapBundle\Document\User", mappedBy="team")
     */
    protected $users;

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
     * Set name
     *
     * @param string $name
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @return string $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @MongoDB\PreRemove
     */
    public function unlinkFromRelatedDocuments() {
        //ToDo: unlink users from deleted skill
//        foreach ($this->getUsers() as $user) {
//            $user->removeSkill($this);
//        }
    }

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }
    
    /**
     * Add user
     *
     * @param User $user
     */
    public function addUser(User $user)
    {
        $this->users[] = $user;
    }

    /**
     * Remove user
     *
     * @param User $user
     */
    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get users
     *
     * @return Collection $users
     */
    public function getUsers()
    {
        return $this->users;
    }
}
