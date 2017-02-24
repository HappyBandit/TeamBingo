#!/bin/sh
chmod 600 ~/.ssh/id_rsa
scp -r -i ~/.ssh/id_rsa build $SERVURL
