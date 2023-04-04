#!/bin/bash

main() {
    echo DB_CONNECTION=$DB_CONNECTION >> api/.env
    echo DB_HOST=$DB_HOST >> api/.env
    echo DB_DATABASE=$DB_DATABASE >> api/.env
    echo DB_USERNAME=$DB_USERNAME >> api/.env
    echo DB_PASSWORD=$DB_PASSWORD >> api/.env
    
    echo APP_NAME=$APP_NAME >> api/.env
    echo APP_KEY=$APP_KEY >> api/.env
    echo APP_ENV=$APP_ENV >> api/.env
    echo APP_DEBUG=$APP_DEBUG >> api/.env

    echo AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID >> api/.env
    echo AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY >> api/.env
    echo AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION >> api/.env
    echo AWS_BUCKET=$AWS_BUCKET >> api/.env

    echo 'Laravel env variables configured'
}

main