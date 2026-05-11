#!/usr/bin/env sh
set -eu

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
POSTGRES_DB="${POSTGRES_DB:-theduel}"
POSTGRES_USER="${POSTGRES_USER:-theduel}"
BACKUP_FILE="${1:-}"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: scripts/restore-postgres.sh path/to/backup.dump.gz"
  exit 1
fi

echo "Restoring $BACKUP_FILE into $POSTGRES_DB"

if echo "$BACKUP_FILE" | grep -q '\.gz$'; then
  gzip -dc "$BACKUP_FILE" | docker compose -f "$COMPOSE_FILE" exec -T postgres pg_restore \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB" \
    --clean \
    --if-exists
else
  docker compose -f "$COMPOSE_FILE" exec -T postgres pg_restore \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB" \
    --clean \
    --if-exists < "$BACKUP_FILE"
fi

echo "Restore complete"
