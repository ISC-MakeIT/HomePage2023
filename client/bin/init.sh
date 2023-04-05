#!/bin/bash

main() {
    yarn
    cp .env.example .env
    yarn start
}

main