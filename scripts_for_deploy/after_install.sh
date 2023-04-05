#!/bin/bash

main() {
    sudo find ./api -type d -exec chmod 755 {} +
    sudo find ./api -type f -exec chmod 644 {} +
    sudo chmod -R 777 ./api/storage

    composer install --working-dir=./api
}

main