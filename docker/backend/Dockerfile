# syntax=docker/dockerfile:1

FROM php:8.3-fpm-alpine AS base

RUN apk add --no-cache \
    bash \
    curl \
    git \
    icu-dev \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    supervisor \
    unzip \
    zip \
  && docker-php-ext-install \
    bcmath \
    intl \
    mbstring \
    opcache \
    pcntl \
    pdo_pgsql \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

FROM base AS vendor
COPY backend/composer.json backend/composer.lock* ./
RUN if [ -f composer.lock ]; then composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts; else composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts; fi

FROM base AS app
COPY --from=vendor /var/www/html/vendor ./vendor
COPY backend/ .
COPY docker/backend/php.ini /usr/local/etc/php/conf.d/99-theduel.ini
COPY docker/backend/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN composer dump-autoload --optimize \
  && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
