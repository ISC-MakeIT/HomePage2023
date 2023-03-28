#!/bin/bash

main() {
    yarn
    yarn api:build
    yarn start
}

main