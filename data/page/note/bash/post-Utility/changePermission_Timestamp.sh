#!/bin/bash

function changeDefaultPermission() {
    echo "Change permission (755) ... $1"

    find "$1" -name '*' -print0 | xargs -0 -i sudo chmod 755 {}
    find "$1" -name '*' -print0 | xargs -0 -i sudo chown $USER {}
}

function changeMasterPermission() {
    echo "Change permission (777) ... $1"

    find "$1" -name '*' -print0 | xargs -0 -i sudo chmod 777 {}
    find "$1" -name '*' -print0 | xargs -0 -i sudo chown $USER {}
}

function changeTimestamp() {
    echo "Change timestamp ($2) ... $1"

    find "$1" -name '*' -print0 | xargs -0 -i touch -c -d "$2" {}
}
