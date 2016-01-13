<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\Skill;
use MapBundle\Form\Type\SkillType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;

class SkillsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $registry)
    {
        $this->dm = $registry->getManager();
        $this->repository = $registry->getRepository('MapBundle:Skill');
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "skills",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Skill"
     * )
     */
    public function getSkillAction($id)
    {
        $this->denyAccessUnlessGranted('view', new Skill);

        $skill = $this->repository->find($id);

        if (!$skill) {
            throw $this->createNotFoundException();
        }

        return $this->handleView($this->view($skill));
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "skills",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="array<MapBundle\Document\Skill>"
     * )
     */
    public function getSkillsAction()
    {
        $this->denyAccessUnlessGranted('view', new Skill);

        $skills = $this->repository->findAll();

        $view = $this->view($skills);

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "skills",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Skill",
     *   input="MapBundle\Form\Type\SkillType"
     * )
     */
    public function postSkillAction(Request $request)
    {
        $skill = new Skill;

        $this->denyAccessUnlessGranted('create', $skill);

        $form = $this->createForm(new SkillType, $skill);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->persist($skill);
            $this->dm->flush();
            $view = $this->view($skill);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "skills",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Skill",
     *   input="MapBundle\Form\Type\SkillType"
     * )
     */
    public function putSkillAction(Request $request, $id)
    {
        $this->denyAccessUnlessGranted('edit', new Skill);

        $skill = $this->repository->find($id);

        if (!$skill) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(new SkillType, $skill, array('method' => 'PUT'));
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->flush();
            $view = $this->view($skill);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "skills",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     */
    public function deleteSkillAction($id)
    {
        $this->denyAccessUnlessGranted('delete', new Skill);

        $skill = $this->repository->find($id);

        if (!$skill) {
            throw $this->createNotFoundException();
        }

        $this->dm->remove($skill);
        $this->dm->flush();

        //ToDo: delete users from team


        return $this->handleView($this->view());
    }
}
