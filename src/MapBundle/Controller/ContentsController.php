<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use MapBundle\Document\Content;
use MapBundle\Form\Type\ContentType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

class ContentsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ContainerInterface $container, ManagerRegistry $registry)
    {
        $this->container = $container;
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
    public function getContentAction($key)
    {
        $content = $this->repository->findByKey($key);

        $view = $content ? $this->view($content) : $this->view(null, 404);

        return $this->handleView($view);
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
        $content = new Content;

        $this->denyAccessUnlessGranted('create', $content);

        $form = $this->createForm(new ContentType, $content);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $this->dm->persist($content);
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
     *   section = "contents",
     *   statusCodes = {
     *     200 = "Returned when successful"
     *   },
     *   output="MapBundle\Document\Content",
     *   input="MapBundle\Form\Type\ContentType"
     * )
     */
    public function putContentAction(Request $request, $key)
    {
        $content = $this->repository->find($key);
        if (!$content) {
            $view = $this->view(null, 404);
        } else {

            $this->denyAccessUnlessGranted('edit', $content);

            $form = $this->createForm(new ContentType, $content, array('method' => 'PUT'));
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
}
