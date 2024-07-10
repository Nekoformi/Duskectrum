#!/bin/bash

alias ll="ls -lhvA --time-style=\"+%Y/%m/%d %H:%M:%S\""

function cleanTerminal() {
    history -c
    cat /dev/null > ~/.bash_history
    clear

    unset blankLine

    echo -e "\e[01;31mThe beginning of something.\e[00;00m\n"
}

alias clean="cleanTerminal"

function addBlankLine() {
    if [[ -z "$blankLine" ]]; then
        blankLine=true
    else
        printf "\n"
    fi
}

PS1="\[\e]0\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;33m\]\u@\h\[\033[01;00m\]: \[\033[01;32m\]\w\[\033[00;00m\] \$ "
PROMPT_COMMAND="addBlankLine"

clean
