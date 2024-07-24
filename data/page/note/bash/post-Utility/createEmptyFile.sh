#!/bin/bash

function createEmptyFile() {
    echo "" > "$1"

    sed '1d' "$1" > "$1"
}

function sudoCreateEmptyFile() {
    echo "" | sudo tee "$1" 1> /dev/null

    sudo sed '1d' "$1" | sudo tee "$1" 1> /dev/null
}
