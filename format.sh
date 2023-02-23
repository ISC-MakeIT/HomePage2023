#!/bin/bash

main() {
    checkStartedTheApiContainer
    runFormat
}

checkStartedTheApiContainer() {
    isStartedTheApiContainer=$(docker compose ps hp-api | grep -e "running" -e "Up")

    if [ "$isStartedTheApiContainer" = "" ]; then
        printErrorMessage "docker does not running."
        printErrorMessage "Try the following command \"docker compose up\""
        abend
    fi
}

printErrorMessage() {
    echo "[ERROR] $1"
}

abend() {
    exit 1
}

runFormat() {
    docker compose exec -T hp-api composer format
}

main