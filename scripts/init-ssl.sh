#!/usr/bin/env sh
set -eu

DOMAIN_ROOT="${DOMAIN_ROOT:-theduel.in}"
EMAIL="${LETSENCRYPT_EMAIL:-admin@theduel.in}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

DOMAINS="
-d theduel.in
-d www.theduel.in
-d app.theduel.in
-d dealer.theduel.in
-d erp.theduel.in
-d api.theduel.in
"

echo "Starting NGINX for HTTP challenge"
cp docker/nginx/conf.d/theduel.http.conf.example docker/nginx/conf.d/theduel.conf
docker compose -f "$COMPOSE_FILE" up -d --no-deps nginx

echo "Requesting Let's Encrypt certificates for $DOMAIN_ROOT"
docker compose -f "$COMPOSE_FILE" run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  $DOMAINS

echo "Reloading NGINX"
git checkout -- docker/nginx/conf.d/theduel.conf 2>/dev/null || true
docker compose -f "$COMPOSE_FILE" exec nginx nginx -s reload

echo "SSL initialization complete"
