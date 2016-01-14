<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\Team;
use MapBundle\Form\Type\TeamType;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class TeamsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $registry)
    {
        $this->dm = $registry->getManager();
        $this->repository = $registry->getRepository('MapBundle:Team');
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "teams",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="array<MapBundle\Document\Team>"
     * )
     */
    public function getTeamsAction()
    {
        $this->denyAccessUnlessGranted('view', new Team);

        $teams = $this->repository->findAll();
        $view = $this->view($teams);

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "teams",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Team"
     * )
     */
    public function getTeamAction($id)
    {
        $this->denyAccessUnlessGranted('view', new Team);

        $team = $this->repository->find($id);

        if (!$team) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted('view', $team);

        return $this->handleView($this->view($team));
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "teams",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Team",
     *   input="MapBundle\Form\Type\TeamType"
     * )
     */
    public function postTeamAction(Request $request)
    {
        $team = new Team;

        $this->denyAccessUnlessGranted('create', $team);

        $form = $this->createForm(new TeamType, $team);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->persist($team);
            $this->dm->flush();
            $view = $this->view($team);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "teams",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Team",
     *   input="MapBundle\Form\Type\TeamType"
     * )
     */
    public function putTeamAction(Request $request, $id)
    {
        $this->denyAccessUnlessGranted('edit', new Team);

        $team = $this->repository->find($id);

        if (!$team) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(new TeamType, $team, array('method' => 'PUT'));
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->flush();
            $view = $this->view($team);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "teams",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     */
    public function deleteTeamAction($id)
    {
        $this->denyAccessUnlessGranted('delete', new Team);

        $team = $this->repository->find($id);

        if (!$team) {
            throw $this->createNotFoundException();
        }

        $this->dm->remove($team);
        $this->dm->flush();

        return $this->handleView($this->view());
    }

    /**
     * @ApiDoc(
     *   resource = false,
     *   section = "teams",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     * )
     */
    public function putTeamUserAction($id, $userId)
    {
        $userRepository = $this->dm->getRepository('MapBundle:User');

        $team = $this->repository->find($id);
        $user = $userRepository->find($userId);

        if (!$team || !$user) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted('link', $user);

        $team->addUser($user);
        $user->addTeam($team);
        
        $this->dm->flush();

        return $this->handleView($this->view());
    }

    /**
     * @ApiDoc(
     *   resource = false,
     *   section = "teams",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     * )
     */
    public function deleteTeamUserAction($id, $userId)
    {
        $userRepository = $this->dm->getRepository('MapBundle:User');

        $team = $this->repository->find($id);
        $user = $userRepository->find($userId);

        if (!$team || !$user) {
            throw $this->createNotFoundException();
        }

        $this->denyAccessUnlessGranted('unlink', $user);

        $team->removeUser($user);
        $user->removeTeam($team);

        $this->dm->flush();

        return $this->handleView($view = $this->view());
    }
}
