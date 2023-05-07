<?php

$config = new PhpCsFixer\Config();

return $config->setRiskyAllowed(true)
    ->setRules([
        '@PSR2' => true,

        'binary_operator_spaces' => [ 'default' => 'align' ],

        'phpdoc_separation' => false,
        'phpdoc_align' => [
            'align' => 'vertical',
        ],
    ])
    ->setFinder(PhpCsFixer\Finder::create()
        ->exclude('vendor')
        ->in(__DIR__)
    );
