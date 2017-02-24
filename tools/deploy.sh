#!/bin/sh
chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa
scp -r build your_username@remotehost.edu:/some/remote/directory/bar
