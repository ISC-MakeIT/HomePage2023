#!/usr/bin/env bash

main() {
    echo "start on entrypoint"

    php-fpm -D
    /usr/sbin/nginx -g "daemon off;"
}

main
