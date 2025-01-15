#!/bin/bash

function insertNewLine() {
    echo -e "$2" >> "$1"
}

function sudoInsertNewLine() {
    echo -e "$2" | sudo tee -a "$1" 1> /dev/null
}
