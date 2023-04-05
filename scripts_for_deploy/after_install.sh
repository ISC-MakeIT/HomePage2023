#!/bin/bash

main() {
    sudo find /var/www/html/api -type f -exec chmod 664 {} \;
    sudo find /var/www/html/api -type d -exec chmod 774 {} \;

    sudo chmod -R 775 /var/www/app/storage
    sudo chmod -R 775 /var/www/app/bootstrap/cache
}

main