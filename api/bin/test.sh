#!/bin/bash

main() {
    php artisan migrate:fresh --path=database/migrations/**
    php artisan db:seed
    composer test
}

main
