<?php

namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\Content;
use MapBundle\Form\Type\ContentType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Prefix;

/**
 * @Prefix("api")
 */
class ContentsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $registry)
    {
        $this->dm = $registry->getManager();
        $this->repository = $registry->getRepository('MapBundle:Content');
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "contents",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Content"
     * )
     */
    public function getContentAction($idOrKey)
    {
        $this->denyAccessUnlessGranted('view', new Content());

        $content = $this->repository->find($idOrKey) ?: $this->repository->findByKey($idOrKey);

        if (!$content) {
            throw $this->createNotFoundException();
        }

        return $this->handleView($this->view($content));
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "contents",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="array<MapBundle\Document\Content>"
     * )
     */
    public function getContentsAction()
    {
        $this->denyAccessUnlessGranted('view', new Content());

        $contents = $this->repository->findAll();

        $view = $this->view($contents);

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "contents",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Content",
     *   input="MapBundle\Form\Type\ContentType"
     * )
     */
    public function postContentAction(Request $request)
    {
        $content = new Content();
        $this->denyAccessUnlessGranted('create', $content);

        $form = $this->createForm(new ContentType(), $content);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->persist($content);
            $this->dm->flush();
            $view = $this->view($content);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "contents",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Content",
     *   input="MapBundle\Form\Type\ContentType"
     * )
     */
    public function putContentAction(Request $request, $id)
    {
        $this->denyAccessUnlessGranted('edit', new Content());

        $content = $this->repository->find($id);

        if (!$content) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(new ContentType(), $content, array('method' => 'PUT'));
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->flush();
            $view = $this->view($content);
        } else {
            $view = $this->view($form, 400);
        }

        return $this->handleView($view);
    }

    /**
     * @ApiDoc(
     *   resource = true,
     *   section = "contents",
     *   statusCodes = {
     *     204 = "Returned when successful"
     *   }
     * )
     */
    public function deleteContentAction($id)
    {
        $this->denyAccessUnlessGranted('delete', new Content());

        $content = $this->repository->find($id);

        if (!$content) {
            throw $this->createNotFoundException();
        }

        $this->dm->remove($content);
        $this->dm->flush();

        return $this->handleView($this->view());
    }
}
