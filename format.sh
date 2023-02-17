#!/bin/bash

main() {
    checkStartedTheApiContainer
    runTest
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

runTest() {
    docker compose exec -T hp-api composer format
}

main