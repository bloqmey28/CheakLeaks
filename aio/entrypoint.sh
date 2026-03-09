
#!/bin/bash
set -e

# Initialize Postgres data directory if empty or missing
if [ ! -d "/var/lib/postgresql/data" ]; then
    mkdir -p /var/lib/postgresql/data
    chown -R postgres:postgres /var/lib/postgresql/data
fi

# Detect Postgres Version
PG_VER=$(ls /usr/lib/postgresql/ | head -n 1)
echo "Detected Postgres Version: $PG_VER"

# Fix Supervisor Config Paths (Replace '13' with detected version)
sed -i "s|/usr/lib/postgresql/13/|/usr/lib/postgresql/$PG_VER/|g" /etc/supervisor/conf.d/supervisord.conf

if [ -z "$(ls -A /var/lib/postgresql/data)" ]; then
    echo "Initializing Database..."
    chown -R postgres:postgres /var/lib/postgresql/data
    su - postgres -c "/usr/lib/postgresql/$PG_VER/bin/initdb -D /var/lib/postgresql/data"
    
    echo "Starting Postgres temporarily to setup user/db..."
    su - postgres -c "/usr/lib/postgresql/$PG_VER/bin/pg_ctl -D /var/lib/postgresql/data -w start"
    
    echo "Creating User and Database..."
    su - postgres -c "psql -c \"CREATE USER leakcheck WITH PASSWORD 'secure_password';\""
    su - postgres -c "psql -c \"CREATE DATABASE leakcheck_db OWNER leakcheck;\""
    
    echo "Stopping Postgres..."
    su - postgres -c "/usr/lib/postgresql/$PG_VER/bin/pg_ctl -D /var/lib/postgresql/data -m fast -w stop"
fi

# Start Supervisor (runs everything)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
