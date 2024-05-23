FROM php:8.1-alpine
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql
WORKDIR /var/www/html
COPY . .
CMD ["php", "artisan", "serve", "--host", "0.0.0.0"]
