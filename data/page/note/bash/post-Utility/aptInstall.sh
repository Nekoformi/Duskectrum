#!/bin/bash

function aptInstall() {
    sudo apt -y install "$1"
}

function aptDownload() { # If you need the Advanced Packaging Tool
    sudo apt -y --reinstall --download-only install "$1"
}

function snapInstall() {
    sudo snap install "$@"
}

function pipInstall() {
    pip install "$1"
}
