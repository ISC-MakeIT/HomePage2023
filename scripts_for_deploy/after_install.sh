#!/bin/bash

main() {
    find /var/www/html/api -type f -exec chmod 664 {} \;
    find /var/www/html/api -type d -exec chmod 774 {} \;

    chmod -R 775 /var/www/app/storage
    chmod -R 775 /var/www/app/bootstrap/cache

    # composer
    cd /var/www/html/api &&
    composer install
}

main