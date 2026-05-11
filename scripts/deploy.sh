#!/usr/bin/env sh
set -eu

APP_DIR="${APP_DIR:-/opt/theduel}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"

cd "$APP_DIR"

echo "Pulling latest code"
git pull --ff-only

echo "Building containers"
docker compose -f "$COMPOSE_FILE" build --pull

echo "Starting services"
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

echo "Running Laravel deployment tasks"
docker compose -f "$COMPOSE_FILE" exec -T backend php artisan migrate --force
docker compose -f "$COMPOSE_FILE" exec -T backend php artisan config:cache
docker compose -f "$COMPOSE_FILE" exec -T backend php artisan route:cache
docker compose -f "$COMPOSE_FILE" exec -T backend php artisan view:cache

echo "Reloading NGINX"
docker compose -f "$COMPOSE_FILE" exec -T nginx nginx -s reload

echo "Pruning old Docker images"
docker image prune -f

echo "Deployment complete"
