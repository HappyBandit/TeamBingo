#!/bin/sh
chmod 600 .ssh/id_rsa
scp -r build your_username@remotehost.edu:/some/remote/directory/bar
