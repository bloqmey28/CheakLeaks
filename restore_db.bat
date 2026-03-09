
@echo off
echo WARNING: This will overwrite the current database with backup_latest.sql
set /p "confirm=Type 'yes' to continue: "
if not "%confirm%"=="yes" exit

echo Restoring Database...
type backup_latest.sql | docker-compose exec -T db psql -U leakcheck leakcheck_db
echo Database Restored Successfully.
pause
