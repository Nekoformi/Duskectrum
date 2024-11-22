#!/bin/bash

function inputData() {
    # set +x

    local data

    echo -e "\e[33;1m$1を入力してください: \e[m" 1>&2
    read -p "" data

    echo "$data"

    # set -x
}
