#!/bin/bash

dirPropBash=~/".bash_proxy"
dirPropCurl=~/".curlrc"
dirPropWget="/etc/wget"
dirPropApt="/etc/apt/apt.conf"

proxyServer="プロキシーのアドレス"
proxyPort="ポート番号"
command="$1"

function createEmptyFile() {
    echo "" > "$1"

    sed '1d' "$1" > "$1"
}

function sudoCreateEmptyFile() {
    echo "" | sudo tee "$1" 1> /dev/null

    sudo sed '1d' "$1" | sudo tee "$1" 1> /dev/null
}

function insertNewLine() {
    echo -e "$2" >> "$1"
}

function sudoInsertNewLine() {
    echo -e "$2" | sudo tee -a "$1" 1> /dev/null
}

function resetProxyConfig() {
    echo -e "#!/bin/bash\n" > "$dirPropBash"

    createEmptyFile "$dirPropCurl"
    sudoCreateEmptyFile "$dirPropWget"
    sudoCreateEmptyFile "$dirPropApt"
}

function addBashProxyConfig() {
    local proxy="http://${proxyServer}:${proxyPort}"

    insertNewLine "$dirPropBash" "export $1=\"${proxy}\""

    export $1="$proxy"
}

function addCurlProxyConfig() {
    local proxy="http://${proxyServer}:${proxyPort}"

    insertNewLine "$dirPropCurl" "$1=${proxy}"
}

function addWgetProxyConfig() {
    local proxy="${proxyServer}:${proxyPort}"

    sudoInsertNewLine "$dirPropWget" "$1 = ${proxy}"
}

function addAptProxyConfig() {
    local proxy="http://${proxyServer}:${proxyPort}"

    sudoInsertNewLine "$dirPropApt" "$1 \"${proxy}\";"
}

function removeBashProxyConfig() {
    insertNewLine "$dirPropBash" "export $1=\"\""

    unset $1=""
}

case "$command" in
    True|true|T|t|1 )
        resetProxyConfig

        addBashProxyConfig "http_proxy"
        addBashProxyConfig "HTTP_PROXY"
        addBashProxyConfig "https_proxy"
        addBashProxyConfig "HTTPS_PROXY"
        addBashProxyConfig "ftp_proxy"
        addBashProxyConfig "FTP_PROXY"

        addCurlProxyConfig "proxy"

        addWgetProxyConfig "http_proxy"
        addWgetProxyConfig "https_proxy"
        addWgetProxyConfig "ftp_proxy"

        addAptProxyConfig "Acquire::http::Proxy"
        addAptProxyConfig "Acquire::https::Proxy"

        git config --global http.proxy "http://${proxyServer}:${proxyPort}"

        echo -e "\e[32;1mプロキシー設定を有効化（ターミナルの再起動が必要な場合があります）\e[m";;
    False|false|F|f|0 )
        resetProxyConfig

        removeBashProxyConfig "http_proxy"
        removeBashProxyConfig "HTTP_PROXY"
        removeBashProxyConfig "https_proxy"
        removeBashProxyConfig "HTTPS_PROXY"
        removeBashProxyConfig "ftp_proxy"
        removeBashProxyConfig "FTP_PROXY"

        git config --global --unset http.proxy

        echo -e "\e[31;1mプロキシー設定を無効化（ターミナルの再起動が必要な場合があります）\e[m";;
esac

source "$dirPropBash"
