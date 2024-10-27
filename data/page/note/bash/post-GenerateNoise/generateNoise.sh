#!/bin/bash

charset="$1"
len="$2"
row="$3"

if [[ -z "$charset" ]]; then
    charset='0-9a-f'
fi

if [[ -z "$len" ]]; then
    len=16
fi

if [[ -z "$row" ]]; then
    row=1
fi

case "$charset" in
    @bin )
        charset='0-1';;
    @num )
        charset='0-9';;
    @hex )
        charset='0-9a-f';;
    @HEX )
        charset='0-9A-F';;
    @abc )
        charset='a-z';;
    @ABC )
        charset='A-Z';;
esac

cat /dev/urandom | tr -dc "$charset" | fold -w $len | head -n $row
