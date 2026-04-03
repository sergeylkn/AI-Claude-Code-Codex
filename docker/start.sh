#!/bin/sh
set -e

# Wait for database and run migrations/seed
ATTEMPTS=0
until npm run prisma:migrate -- --name init >/tmp/prisma-migrate.log 2>&1; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ "$ATTEMPTS" -gt 15 ]; then
    echo "Prisma migrate failed after retries:"
    cat /tmp/prisma-migrate.log || true
    exit 1
  fi
  echo "Waiting for database... attempt $ATTEMPTS"
  sleep 2
done

npm run prisma:seed
npm run dev -- --hostname 0.0.0.0 --port 3000
