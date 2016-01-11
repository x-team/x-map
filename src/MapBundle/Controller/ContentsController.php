<?php namespace MapBundle\Controller;

use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use FOS\RestBundle\Controller\FOSRestController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class ContentsController extends FOSRestController
{
    protected $dm;

    protected $repository;

    public function __construct(ManagerRegistry $dm)
    {
        $this->dm = $dm;
        $this->repository = $dm->getRepository('MapBundle:Content');
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
}
