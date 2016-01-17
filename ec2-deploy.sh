#!/usr/bin/env bash

# Install bower and PHP packages
phpenv local 5.5
composer config -g github-oauth.github.com $GITHUB_ACCESS_TOKEN
composer install --prefer-dist --no-interaction
composer dump-autoload --no-dev --optimize

cd ..
mv clone build
zip -r build.zip build/* -x build/**/.git\*

echo "Removing previous build..."
ssh ${EC2_USER}@${EC2_HOST} 'rm -rf build.zip build'

echo "Uploading new build..."
scp build.zip ${EC2_USER}@${EC2_HOST}:${EC2_PATH}

echo "Removing previous build..."
ssh ${EC2_USER}@${EC2_HOST} 'rm -rf build'

echo "Unzipping..."
ssh ${EC2_USER}@${EC2_HOST} 'unzip build.zip'

echo "Removing previous version..."
ssh ${EC2_USER}@${EC2_HOST} 'sudo rm -rf /var/www/x-map/*'

echo "Copying latest code..."
ssh ${EC2_USER}@${EC2_HOST} 'sudo cp -rf /home/ubuntu/build/* /var/www/x-map/'

echo "Setting permissions..."
ssh ${EC2_USER}@${EC2_HOST} 'sudo chown -R www-data:www-data /var/www/x-map'

echo "Deploy complete."

