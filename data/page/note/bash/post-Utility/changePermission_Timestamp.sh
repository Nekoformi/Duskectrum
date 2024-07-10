#!/bin/bash

function changeDefaultPermission() {
    echo "Change permission (755) ... $1"

    find "$1" -name '*' -print0 | xargs -0 -i chmod 755 {}
}

function changeMasterPermission() {
    echo "Change permission (777) ... $1"

    find "$1" -name '*' -print0 | xargs -0 -i chmod 777 {}
}

function changeTimestamp() {
    echo "Change timestamp ($2) ... $1"

    find "$1" -name '*' -print0 | xargs -0 -i touch -c -d "$2" {}
}
