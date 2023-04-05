#!/bin/bash

main() {
    sudo chmod -R 777 ./api

    composer install --working-dir=./api
}

main