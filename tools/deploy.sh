#!/bin/sh
chmod 600 id_rsa
mv id_rsa ~/.ssh/id_rsa
scp -r -o StrictHostKeyChecking=no build $SERVURL
