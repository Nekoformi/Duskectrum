#!/bin/bash

export QEMU_LD_PREFIX=/usr/aarch64-linux-gnu/

app="/home/user/Application/AquesTalk Pi/AquesTalkPi"

target="$1"
output="$2"
option="-b -s 120"

function generateAudioData() {
    local app="$1"
    local output="$2"
    local option="$3"
    local text="$4"

    if [[ "$text" =~ ^([0-9]{4}):([0-9]+):(.+)$ ]]; then
        local index="${BASH_REMATCH[1]}"
        local char="${BASH_REMATCH[2]}"
        local text="${BASH_REMATCH[3]}"

        echo "Generate Data ... ${index}.wav"

        "$app" -v f$char $option "$text" > "${output%/}/${index}.wav"
    fi
}

export -f generateAudioData

nl -w4 -nrz -s":" -bp^[^\;] "$target" | xargs -i bash -c "generateAudioData \"${app}\" \"${output}\" \"${option}\" \"{}\""
