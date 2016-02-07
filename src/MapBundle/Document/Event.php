<?php

namespace MapBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @MongoDB\Document
 * @MongoDB\HasLifecycleCallbacks
 */
class Event
{
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
     * @MongoDB\String
     * @Assert\NotBlank
     * @Assert\Length(min=3,max=64)
     */
    protected $type;

    /**
     * @MongoDB\Date
     * @Assert\NotBlank
     * @Serializer\Type("DateTime<'Y-m-d'>")
     */
    protected $dateStart;

    /**
     * @MongoDB\Date
     * @Serializer\Type("DateTime<'Y-m-d'>")
     */
    protected $dateEnd;

    /**
     * @MongoDB\Hash
     */
    protected $data;

    //ToDo: find out why creation fails when notBlank constraint is applied
    /**
     * @MongoDB\ReferenceOne(targetDocument="MapBundle\Document\User")
     */
    protected $creator;

    /**
     * @MongoDB\Collection
     * @MongoDB\ReferenceMany(targetDocument="MapBundle\Document\User")
     */
    protected $users;

    /**
     * @MongoDB\Float
     */
    protected $lat;

    /**
     * @MongoDB\Float
     */
    protected $lng;

    /**
     * Get id.
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set type.
     *
     * @param string $type
     *
     * @return self
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return string $type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set dateStart.
     *
     * @param date $dateStart
     *
     * @return self
     */
    public function setDateStart($dateStart)
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    /**
     * Get dateStart.
     *
     * @return date $dateStart
     */
    public function getDateStart()
    {
        return $this->dateStart;
    }

    /**
     * Set dateEnd.
     *
     * @param date $dateEnd
     *
     * @return self
     */
    public function setDateEnd($dateEnd)
    {
        $this->dateEnd = $dateEnd;

        return $this;
    }

    /**
     * Get dateEnd.
     *
     * @return date $dateEnd
     */
    public function getDateEnd()
    {
        return $this->dateEnd;
    }

    /**
     * Set data.
     *
     * @param hash $data
     *
     * @return self
     */
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Get data.
     *
     * @return hash $data
     */
    public function getData()
    {
        return $this->data;
    }
    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    /**
     * Add user.
     *
     * @param User $user
     */
    public function addUser(User $user)
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }
    }

    /**
     * Remove user.
     *
     * @param User $user
     */
    public function removeUser(User $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get users.
     *
     * @return Collection $users
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * @MongoDB\PreRemove
     */
    public function unlinkFromRelatedDocuments()
    {
        foreach ($this->getUsers() as $user) {
            $user->removeEvent($this);
        }
    }

    /**
     * @MongoDB\PrePersist
     */
    public function updateDateEnd()
    {
        if (!$this->getDateEnd()) {
            $this->setDateEnd($this->getDateStart());
        }
    }

    /**
     * Set lat.
     *
     * @param float $lat
     *
     * @return self
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat.
     *
     * @return float $lat
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lng.
     *
     * @param float $lng
     *
     * @return self
     */
    public function setLng($lng)
    {
        $this->lng = $lng;

        return $this;
    }

    /**
     * Get lng.
     *
     * @return float $lng
     */
    public function getLng()
    {
        return $this->lng;
    }

    /**
     * Set creator.
     *
     * @param User $creator
     *
     * @return self
     */
    public function setCreator(User $creator)
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * Get creator.
     *
     * @return User $creator
     */
    public function getCreator()
    {
        return $this->creator;
    }
}
