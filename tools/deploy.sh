#!/bin/sh
chmod 600 id_rsa
mv id_rsa ~/.ssh/id_rsa
cat ~/.ssh/id_rsa
scp -r -v -i ~/.ssh/id_rsa build $SERVURL
