<?php

namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\Event;
use MapBundle\Form\Type\EventType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Prefix;

/**
 * @Prefix("api")
 */
class EventsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $registry)
    {
        $this->dm = $registry->getManager();
        $this->repository = $registry->getRepository('MapBundle:Event');
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "events",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Event"
     * )
     */
    public function getEventAction($id)
    {
        $this->denyAccessUnlessGranted('view', new Event());

        $event = $this->repository->find($id);

        if (!$event) {
            throw $this->createNotFoundException();
        }

        return $this->handleView($this->view($event));
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "events",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="array<MapBundle\Document\Event>"
     * )
     */
    public function getEventsAction()
    {
        $this->denyAccessUnlessGranted('view', new Event());

        $events = $this->repository->findAll();

        $view = $this->view($events);

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "events",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Event",
     *   input="MapBundle\Form\Type\EventType"
     * )
     */
    public function postEventAction(Request $request)
    {
        $event = new Event();

        $this->denyAccessUnlessGranted('create', $event);

        $form = $this->createForm(new EventType(), $event);
        $form->handleRequest($request);

        $event->setCreator($this->get('security.context')->getToken()->getUser());

        if ($form->isValid()) {
            $this->dm->persist($event);
            $this->dm->flush();
            $view = $this->view($event);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "events",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Event",
     *   input="MapBundle\Form\Type\EventType"
     * )
     */
    public function putEventAction(Request $request, $id)
    {
        $event = $this->repository->find($id);

        if (!$event) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted('edit', $event);

        $form = $this->createForm(new EventType(), $event, array('method' => 'PUT'));
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->flush();
            $view = $this->view($event);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "events",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     */
    public function deleteEventAction($id)
    {
        $event = $this->repository->find($id);

        if (!$event) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted('delete', $event);

        $this->dm->remove($event);
        $this->dm->flush();

        return $this->handleView($this->view());
    }

    /**
     * @ApiDoc(
     *   resource = false,
     *   section = "events",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     * )
     */
    public function putEventUserAction($id, $userId)
    {
        $userRepository = $this->dm->getRepository('MapBundle:User');

        $event = $this->repository->find($id);
        $user = $userRepository->find($userId);

        if (!$event || !$user) {
            throw $this->createNotFoundException();
        }
        $this->denyAccessUnlessGranted('link_event', $user);

        $user->addEvent($event);
        $event->addUser($user);

        $this->dm->flush();

        return $this->handleView($this->view());
    }

    /**
     * @ApiDoc(
     *   resource = false,
     *   section = "events",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     * )
     */
    public function deleteEventUserAction($id, $userId)
    {
        $userRepository = $this->dm->getRepository('MapBundle:User');

        $event = $this->repository->find($id);
        $user = $userRepository->find($userId);

        if (!$event || !$user) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted('unlink_event', $user);

        $user->removeEvent($event);
        $event->removeUser($user);

        $this->dm->flush();

        return $this->handleView($view = $this->view());
    }
}
