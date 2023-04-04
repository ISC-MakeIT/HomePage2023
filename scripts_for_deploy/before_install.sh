#!/bin/bash

main() {
    cd api &&
    chmod 777 -R ./* &&
    composer install
}

main