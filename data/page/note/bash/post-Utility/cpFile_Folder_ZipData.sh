#!/bin/bash

function cpFile() {
    if [ -d "$2" ]; then
        rm -f "$2"
    else
        mkdir -p "${2%/*}"
    fi

    echo "Copy file ... $1 -> $2"

    cp -fp "$1" "$2"
}

function cpFolder() {
    if [ -d "$2" ]; then
        rm -rf "${2%/}"/*
    else
        mkdir -p "${2%/}"
    fi

    echo "Copy folder ... ${1%/}/ -> ${2%/}/"

    cp -RTfp "${1%/}"/ "${2%/}"/
}

function cpZipData() {
    if [ -d "$2" ]; then
        rm -rf "${2%/}"/*
    else
        mkdir -p "${2%/}"
    fi

    echo "Extract file ... $1 -> ${2%/}/"

    unzip "$1" -d "${2%/}"/
}
