
@echo off
echo Starting Backup of LeakCheck Database...
docker-compose exec -T db pg_dump -U leakcheck leakcheck_db > backup_latest.sql
echo Backup saved to backup_latest.sql
pause
