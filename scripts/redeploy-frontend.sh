#!/bin/bash

cd ./frontend

git reset --hard HEAD

git pull

npm install

npm run build

sudo cp -R dist/ /var/www/html/rocquieter/

sudo systemctl reload nginx
