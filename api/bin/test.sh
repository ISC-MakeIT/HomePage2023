#!/bin/bash

main() {
    php artisan migrate:fresh --path=database/migrations/**
    php artisan insert:role_202302191506
    php artisan test
}

main
