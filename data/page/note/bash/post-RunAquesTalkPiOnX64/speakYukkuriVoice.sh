#!/bin/bash

export QEMU_LD_PREFIX=/usr/aarch64-linux-gnu/

app="/home/user/Application/AquesTalk Pi/AquesTalkPi"

text=""
option="-b -s 120"

while true; do
    read -p "" text

    [[ "$text" = "exit" ]] && exit 0

    "$app" $option "$text" | aplay -q
done
