#!/bin/bash

main() {
    php /var/www/html/api/artisan clear-compiled
    php /var/www/html/api/artisan optimize
    php /var/www/html/api/artisan view:clear
    php /var/www/html/api/artisan cache:clear

    sudo find /var/www/html/api -type d -exec chmod 755 {} +
    sudo find /var/www/html/api -type f -exec chmod 644 {} +
    chmod -R 777 /var/www/html/api/storage

    composer install --working-dir=/var/www/html/api
}

main