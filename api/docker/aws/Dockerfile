FROM php:8.1-apache

COPY ./php/php.ini /usr/local/etc/php/
COPY ./apache/*.conf /etc/apache2/sites-enabled/

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# zip unzip install
RUN apt-get -y update && apt-get --no-install-recommends install -y \
    zip \
    unzip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libpq-dev \
    libmcrypt-dev \
    libicu-dev \
    libonig-dev \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
&& docker-php-ext-install -j$(nproc) gd intl mbstring exif pdo_pgsql opcache

# composer install
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
&& php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
&& php composer-setup.php \
&& mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html/

RUN a2enmod rewrite
