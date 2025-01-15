#!/bin/bash

function confirmExecution() {
    # set +x

    local confirm

    echo -e "\e[33;1m本当に実行しますか？ (\"Yes\"で実行): \e[m"
    read -p "" confirm

    case "$confirm" in
        Yes|yes )
            echo -e "\e[32;1m処理を開始します\e[m"

            # set -x

            return 1;;
        * )
            echo -e "\e[31;1m処理を中止します\e[m"

            # set -x

            return 0;;
    esac
}
