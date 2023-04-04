#!/usr/bin/env bash

main() {
    echo "start on build"

    composer --version
    yum install php-mbstring php-xml -y
    amazon-linux-extras install nginx1 -y
    composer install
    cp -p .env.example .env
    php artisan key:generate

    # Nginx や PHP-FPM の設定ファイルを格納
    cp -p ./scripts/resources/nginx.conf /etc/nginx/nginx.conf
    cp -p ./scripts/resources/www.conf /etc/php-fpm.d/www.conf

    # ディレクトリの権限設定
    chown -R :nginx ./storage
    chown -R :nginx ./bootstrap/cache
    chown -R :nginx ./public

    find ./storage -type d -exec chmod 775 {} \;
    find ./storage -type f -exec chmod 664 {} \;

    find ./bootstrap/cache -type d -exec chmod 775 {} \;
    find ./bootstrap/cache -type f -exec chmod 664 {} \;

    find ./storage -type d -exec chmod g+s {} \;
    find ./bootstrap/cache -type d -exec chmod g+s {} \;

    setfacl -R -d -m g::rwx ./storage
    setfacl -R -d -m g::rwx ./bootstrap/cache

    # アプリケーションのログ出力先を設定
    ln -s /dev/stdout /var/log/nginx/error.log
    ln -s /dev/stdout /var/log/nginx/access.log

    ln -s /dev/stdout /var/log/php-fpm/error.log
    ln -s /dev/stdout /var/log/php-fpm/www-access.log
    ln -s /dev/stdout /var/log/php-fpm/www-error.log
}

main
