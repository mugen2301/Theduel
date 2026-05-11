#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

docker compose -f "$COMPOSE_FILE" run --rm certbot renew --webroot --webroot-path /var/www/certbot
docker compose -f "$COMPOSE_FILE" exec nginx nginx -s reload
