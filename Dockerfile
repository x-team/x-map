FROM php:5.6-fpm

MAINTAINER Jędrzej Kuryło <jedrzej@x-team.com>

ADD . /var/www/x-map
ADD nginx /etc/nginx/conf.d
ADD php.ini /usr/local/etc/php/

# install dependencies
RUN apt-get update && apt-get install -y git

# build and enable MongoDB driver for PHP
RUN apt-get update && apt-get install -y libssl-dev && pecl install mongo mongodb && docker-php-ext-enable mongo.so mongodb.so

# install and enable mbstring, zip and pcntl extensions
RUN docker-php-ext-install mbstring zip pcntl

# enable opcache
RUN docker-php-ext-enable opcache.so

# install composer
RUN curl -sS https://getcomposer.org/installer | php && chmod a+x composer.phar && mv composer.phar /usr/bin/composer

# upgrade npm
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash - && apt-get install -y nodejs

# generate public/private key pair to be used with JWT token
RUN mkdir -p /var/keys && \
    openssl genrsa -out /var/keys/private.pem -passout pass:ThisPassPhraseIsNotSoSecretChangeIt -aes256 4096 && \
    openssl rsa -pubout -in /var/keys/private.pem -out /var/keys/public.pem -passin pass:ThisPassPhraseIsNotSoSecretChangeIt

# configure apache
RUN usermod -u 1000 www-data
RUN mkdir -p /var/www/x-map/app/cache /var/www/x-map/app/logs /var/keys
RUN chown -R www-data:www-data /var/www/x-map/app/cache /var/www/x-map/app/logs /var/keys

# configure environment variables
ENV MONGODB_HOST=mongo
ENV KEY_FOLDER=/var/keys
ENV COMPOSER_PROCESS_TIMEOUT=900

WORKDIR /var/www/x-map