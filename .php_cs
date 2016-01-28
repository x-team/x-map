<?php

$finder = Symfony\CS\Finder\DefaultFinder::create()
    ->exclude(['app/cache', 'vendor', 'client', 'src/AppBundle', 'tests/_support'])
    ->in(__DIR__);

return Symfony\CS\Config\Config::create()
    ->level(Symfony\CS\FixerInterface::SYMFONY_LEVEL)
    ->finder($finder);