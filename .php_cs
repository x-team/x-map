<?php

$finder = Symfony\CS\Finder\DefaultFinder::create()
    ->exclude(['app/cache', 'vendor', 'client', 'tests/_support', 'bin'])
    ->in(__DIR__);

return Symfony\CS\Config\Config::create()
    ->level(Symfony\CS\FixerInterface::SYMFONY_LEVEL)
    ->finder($finder);