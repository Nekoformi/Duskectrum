#!/bin/bash

target="$1"
output="$2"
format=".*\.(zip|ZIP|7z|7Z|tar|TAR|gz|GZ)"

function extractFile() {
    local target="$1"
    local file="${target##*/}"
    local double

    if [[ "${file%.*}" =~ ^.*.(tar|TAR)$ ]]; then
        local file="${file%.*}"
        local double=true
    fi

    if [[ -n "$2" ]]; then
        local output="${2%/}/${file%.*}"/
    else
        local output="${target%/*}/${file%.*}"/
    fi

    if [[ -z "$double" ]]; then
        7z x -o"$output" "$target"
    else
        7z x -so "$target" | 7z x -si -ttar -o"$output"
    fi

    echo "Extract file ... ${target} -> ${output}"
}

export -f extractFile

find "$target" -regextype posix-extended -regex "$format" -type f -print0 | xargs -0 -i bash -c "extractFile \"{}\" \"${output}\""
