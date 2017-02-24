#!/bin/sh
chmod 600 id_rsa
mv id_rsa ~/.ssh/id_rsa
scp -r build your_username@remotehost.edu:/some/remote/directory/bar
