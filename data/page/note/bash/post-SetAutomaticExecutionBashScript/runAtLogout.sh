#!/bin/bash

# Disable Some History (only KDE)

sudo cat /dev/null > ~/.local/share/recently-used.xbel
sudo rm -f ~/.local/share/user-places.xbel.bak
sudo rm -f ~/.local/share/user-places.xbel.tbcache
sudo rm -rf ~/.local/share/RecentDocuments/*

# Disable Command History

history -c
cat /dev/null > ~/.bash_history

# Disable Log

sudo rm -rf /var/log/*
