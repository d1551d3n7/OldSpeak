#!/bin/bash

# Fork ofhttp://usrportage.de/archives/919-Batch-generating-SSL-certificates.html
# Author: d4v1ncy@protonmail.ch

# Script accepts a single argument, the fqdn for the cert
PROG=$(basename "$0")
DOMAIN="${1}"
if [ -z "$DOMAIN" ]; then
    echo "Usage: ${PROG} <domain>"
    exit 1
fi

secret=$(head -c 500 /dev/urandom | tr -dc a-z0-9A-Z | head -c 128)
PASSPHRASE=$(echo -e "${secret}\n")
ARMORED_PW=$(base64 <<< "$PASSPHRASE")
# Certificate details; replace items in angle brackets with your own info
#"/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com"
subj="
C=EE
ST=Estonia
L=Tallinn
O=$DOMAIN
CN=$DOMAIN
OU=Information Security
emailAddress=infosec@$DOMAIN"

file_prefix="self-signed"
passphrase_filename="${file_prefix}.${DOMAIN}.pw"
key_filename="${file_prefix}.${DOMAIN}.key"
original_key_filename="${key_filename}.original"
csr_filename="${file_prefix}.${DOMAIN}.csr"
cert_filename="${file_prefix}.${DOMAIN}.cert"

# Generate the server private key
declare -x PASSPHRASE
echo -e "\033[1;31m"

function handle_error() {
    echo -ne "\033[0m"
    reason="${1}"
    shift
    unset PASSPHRASE
    echo -ne "\033[1;37mError: \033[0;31m${reason}\033[0m\n"
    echo -ne "\033[1;37musing password: \033[0;31m${reason}\033[0m\n"
    exit 1
}

function handle_success() {
    echo -ne "\033[0m"
    reason="${1}"
    shift
    echo -ne "\033[1;37mSuccess: \033[0;32m${reason}\033[0m\n"
}

function handle_info() {
    echo -ne "\033[0m"
    reason="${1}"
    shift
    echo -ne "\033[1;37mInfo: \033[0;34m${reason}\033[0m\n"
}

function handle_metadata() {
    echo -ne "\033[0m"
    reason="${1}"
    shift
    echo -ne "\033[0;33m${reason}\033[0m\n"
}


if [ -n "${passphrase_filename}" ]; then
    handle_success "stored auto-generated passphrase into ${passphrase_filename}"
else
    handle_error "passphrase file already exists: ${passphrase_filename}"
fi

handle_info "using auto-generated passphrase (base64):"
handle_metadata "${ARMORED_PW}"

if openssl genrsa -aes256 -out "${key_filename}" -passout env:PASSPHRASE 4096; then
    handle_success "generated key: ${key_filename}"
else
    handle_error "failed to generate key: ${key_filename}"
fi

# Generate the CSR
if openssl req \
           -new \
           -batch \
           -subj "$(echo -n "$subj" | tr "\n" "/")" \
           -key "${key_filename}" \
           -out "${csr_filename}" \
           -passin env:PASSPHRASE; then
    handle_success "generated self-signed certificate request: ${csr_filename} with key ${key_filename}"
else
    handle_error "failed to generate self-signed certificate request: ${csr_filename} with key ${key_filename}"
fi

if cp "${key_filename}" "${original_key_filename}"; then
    handle_success "created a backup of the original key at ${original_key_filename}"
else
    handle_error "failed to backup original key from ${key_filename} to ${original_key_filename}"
fi

# "embed the password" in the key file
if openssl rsa -in "${original_key_filename}" -out "${key_filename}" -passin env:PASSPHRASE; then
    handle_success "stripped the key file to not require password: ${key_filename}"
else
    handle_error "failed to strip the key file ${original_key_filename} into ${key_filename}"
fi

# Generate the cert (good for 1 year)
if openssl x509 -req -days 365 -in "${csr_filename}" -signkey "${key_filename}" -out "${cert_filename}"; then
    handle_success "generated self-signed certificate: ${cert_filename}"
else
    handle_error "failed to generate certificate: ${cert_filename}"
fi;
