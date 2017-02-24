#!/bin/sh
chmod 600 id_rsa
mv id_rsa ~/.ssh/id_rsa
scp -r -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no build $SERVURL
