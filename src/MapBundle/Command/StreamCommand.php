<?php

namespace MapBundle\Command;

use GuzzleHttp\Client;
use MapBundle\Document\Log;
use MapBundle\Document\User;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class StreamCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this->setName('xmap:stream')->setDescription('Posts event stream to Slack');
    }


    protected function execute()
    {
        $query = $this->getContainer()->get('doctrine_mongodb')->getManager()->createQueryBuilder('MapBundle:Log')
            ->field('isProcessed')->equals(false)
            ->limit(5)
            ->sort('date', 'ASC')
            ->getQuery();

        $messages =[];
        foreach ($query->execute() as $log) {
            $payload = $this->getPayload($log->getData());
            $payload['user'] = $log->getUser();
            $payload['location'] = $this->getLocationForLog($log);

            $messages[] = $this->buildMessage($log->getAction(), $payload) ;

            $log->setIsProcessed(true);
        }

        if (!empty($messages)) {
            $this->postToSlack(implode("\n", $messages));
        }

        $this->getContainer()->get('doctrine_mongodb')->getManager()->flush();
    }

    public function postToSlack($message)
    {
        $client = new Client();
        $client->post($this->getContainer()->getParameter('slackurl'), [
            'json' => [
                'username' => 'X-Map Stream',
                'text' => $message
            ]
        ]);
    }

    protected function buildMessage($action, $payload)
    {
        return $this->getContainer()->get('templating')->render('MapBundle:messages:' . $action . '.txt.twig', $payload);
    }

    protected function getPayload($data)
    {
        if (empty($data)) {
            return;
        }

        return array_map(function($value) {
            return $this->getContainer()->get('doctrine_mongodb')->getRepository($value['type'])->find($value['id']);
        }, $data);
    }

    protected function getLocationForLog(Log $log)
    {
        if (is_null($log->getLat()) || is_null($log->getLng())) {
            return;
        }

        $client = new Client;
        $result = $client->get(sprintf('https://maps.googleapis.com/maps/api/geocode/json?latlng=%f,%f&key=%s', $log->getLat(), $log->getLng(), 'AIzaSyCMjYwv0BNpux8Ich1kyDx491RG_S8IDBs'));

        $results = json_decode($result->getBody(), true);

        if (isset($results['results'])) {
            $result = $results['results'][0];

            if (isset($result['address_components'][1])) {
                return sprintf('%s in %s', $result['address_components'][1]['long_name'], $result['address_components'][4]['long_name']);
            } else if (isset($result['address_components'][2])) {
                return sprintf('%s in %s', $result['address_components'][2]['long_name'], $result['address_components'][4]['long_name']);
            } else if (isset($result['address_components'][3])) {
                return sprintf('%s in %s', $result['address_components'][3]['long_name'], $result['address_components'][4]['long_name']);
            } else {
                return $result['address_components'][4]['long_name'];
            }
        }
    }
}