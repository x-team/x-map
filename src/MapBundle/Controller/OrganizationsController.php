<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\Organization;
use MapBundle\Document\User;
use MapBundle\Form\Type\OrganizationType;
use MapBundle\Form\Type\UserType;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class OrganizationsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $dm)
    {
        $this->dm = $dm;
        $this->repository = $dm->getRepository('MapBundle:Organization');
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "organizations",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="array<MapBundle\Document\Organization>"
     * )
     */
    public function getOrganizationsAction()
    {
        $organizations = $this->repository->findAll();
        $view = $this->view($organizations);

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "organizations",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Organization",
     *   input="MapBundle\Form\Type\OrganizationType"
     * )
     */
    public function postOrganizationAction(Request $request)
    {
        $organization = new Organization;

        $this->denyAccessUnlessGranted('create', $organization);

        $form = $this->createForm(new OrganizationType, $organization);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->persist($organization);
            $this->dm->flush();
            $view = $this->view();
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "organizations",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Organization",
     *   input="MapBundle\Form\Type\OrganizationType"
     * )
     */
    public function putOrganizationAction(Request $request, $id)
    {
        $organization = $this->repository->find($id);
        if (!$organization) {
            $view = $this->view(null, 404);
        } else {

            $this->denyAccessUnlessGranted('edit', $organization);

            $form = $this->createForm(new OrganizationType, $organization, array('method' => 'PUT'));
            $form->handleRequest($request);

            if ($form->isValid()) {
                $this->dm->flush();
                $view = $this->view();
            } else {
                $view = $this->view($form, 400);
            }

        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "organizations",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Organization",
     * )
     */
    public function getOrganizationAction($id)
    {
        $organization = $this->repository->find($id);

        $this->denyAccessUnlessGranted('view', $organization);

        $view = $organization ? $this->view($organization) : $this->view(null, 404);

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   section = "organizations",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     */
    public function putOrganizationUserAction($id, $userId) {
        $organization = $this->repository->find($id);

        $userRepository = $this->dm->getRepository('MapBundle:User');
        $user = $userRepository->find($userId);

        if (!$organization || !$user) {
            $view = $this->view(null, 404);
        } else {
            $this->denyAccessUnlessGranted('link', $organization);

            $user->setOrganization($organization->getId());
            $this->dm->flush();

            $view = $this->view();
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   section = "organizations",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   }
     * )
     */
    public function deleteOrganizationUserAction($id, $userId) {
        $organization = $this->repository->find($id);

        $userRepository = $this->dm->getRepository('MapBundle:User');
        $user = $userRepository->find($userId);

        if (!$organization || !$user) {
            $view = $this->view(null, 404);
        } else {
            $this->denyAccessUnlessGranted('link', $organization);

            $user->setOrganization(null);
            $user->setTeams([]);
            $this->dm->flush();

            $view = $this->view();
        }

        return $this->handleView($view);
    }
}
