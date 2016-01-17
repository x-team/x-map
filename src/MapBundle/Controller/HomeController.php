<?php namespace MapBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HomeController extends Controller
{
    public function indexAction()
    {
        return $this->render('MapBundle:Default:index.html.twig');
    }
}