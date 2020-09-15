#!/bin/bash
echo "Exceuting deploy.prod.sh for sanjiwani_backend"
echo "Preparing for deploy Sanjiwani_backend BACKEND to api.codolyte.com"
ssh instance-2.asia-south1-b.apecto-prod-266514  << 'ENDSSH'
cd ~/apecto
echo "directory changed......"
pm2 delete sanjiwani_backend
sudo rm -Rv sanjiwanibackend
git clone git@gitlab.com:codolyte/sanjiwanibackend.git
echo "cloning staered from git repository......."
cd sanjiwanibackend
echo "directory changed......"
ls -ls
npm install
pm2 start ecosystem.config.js --env production
exit
ENDSSH
