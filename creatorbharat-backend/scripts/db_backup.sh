#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# CreatorBharat Database Backup Automation Script
# Usage:
#   1. Make script executable: chmod +x db_backup.sh
#   2. Add to crontab for automatic backups:
#      0 2 * * * /path/to/creatorbharat-backend/scripts/db_backup.sh >> /var/log/db_backup.log 2>&1
# ═══════════════════════════════════════════════════════════════════════════════

# Load environment variables from .env if running locally
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
if [ -f "$SCRIPTPATH/../.env" ]; then
    export $(grep -v '^#' "$SCRIPTPATH/../.env" | xargs)
fi

# Variables
BACKUP_DIR="${BACKUP_DIR:-$SCRIPTPATH/../backups}"
RETENTION_DAYS=30
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/creatorbharat_db_$TIMESTAMP.sql"
BACKUP_GZ="$BACKUP_FILE.gz"

# Create backup directory if not exists
mkdir -p "$BACKUP_DIR"

echo "=== [$(date)] Database Backup Start ==="

# Validate DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL variable is not set or empty."
    exit 1
fi

echo "Creating database dump..."
pg_dump "$DATABASE_URL" -F p -f "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "Database dump created successfully. Compressing file..."
    gzip "$BACKUP_FILE"
    echo "Backup completed successfully: $BACKUP_GZ"
    
    # Prune backups older than RETENTION_DAYS
    echo "Pruning backups older than $RETENTION_DAYS days..."
    find "$BACKUP_DIR" -name "creatorbharat_db_*.sql.gz" -mtime +$RETENTION_DAYS -exec rm {} \;
    echo "Pruning complete."
else
    echo "ERROR: Database dump creation failed."
    exit 1
fi

echo "=== [$(date)] Database Backup End ==="
