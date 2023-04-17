#!/bin/bash

main() {
    yarn
    cp .env.example .env
    yarn dev
}

main