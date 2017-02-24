#!/bin/sh
chmod 600 id_rsa
mv id_rsa ~/.ssh/id_rsa
scp -r build $SERVURL -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null
