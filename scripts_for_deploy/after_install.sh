#!/bin/bash

main() {
    sudo find /var/www/html/api -type f -exec chmod 664 {} \;
    sudo find /var/www/html/api -type d -exec chmod 774 {} \;

    sudo chmod -R 775 /var/www/html/api/storage
    sudo chmod -R 775 /var/www/html/api/bootstrap/cache

    cd /var/www/html/api && sudo /usr/local/bin/composer install
}

main