#!/bin/bash

function selectOption() {
    # set +x

    local option
    local select

    eval option=($1)

    echo -e "\e[33;1m-Option-------------------------------------------------------------------------\e[m"

    local i=1

    for item in "${option[@]}"; do
        echo -e "\e[33;1m- [${i}] ${item}\e[m"

        echo $((i++)) >& /dev/null
    done

    local label="$2"

    if [[ -z "$label" ]]; then
        label="オプション"
    fi

    echo -e "\e[33;1m- [*] キャンセル\e[m"
    echo -e "\e[33;1m--------------------------------------------------------------------------------\e[m"
    echo -e "\e[33;1m${label}を選択してください: \e[m"
    read -p "" select

    if [[ $select =~ ^([0-9]{1,2})|([0-1][0-9]{2})|(2[0-4][0-9])|(25[0-9])$ ]]; then # 0 - 255
        # set -x

        return $((select))
    else
        # set -x

        return 0
    fi
}
