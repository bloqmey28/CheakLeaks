@echo off
echo Starting Backup of LeakCheck Database...

:: Check if AIO container is running
FOR /F "tokens=*" %%i IN ('docker ps -q -f "ancestor=bloqmey/leakcheck:latest"') DO SET AIO_CONTAINER=%%i

IF NOT "%AIO_CONTAINER%"=="" (
    echo Found All-in-One container. Backing up...
    docker exec -t %AIO_CONTAINER% su - postgres -c "pg_dump -U leakcheck leakcheck_db" > backup_latest.sql
    goto :success
)

:: Try standard compose container names
echo Trying direct docker exec for compose db container...
docker exec -t leakcheck-db-1 su - postgres -c "pg_dump -U leakcheck leakcheck_db" > backup_latest.sql 2>nul
if %ERRORLEVEL% equ 0 goto :success

:: Try explicit docker-compose command
echo Trying docker-compose method...
docker-compose exec -T db pg_dump -U leakcheck leakcheck_db > backup_latest.sql 2>nul
if %ERRORLEVEL% equ 0 goto :success

echo Error: Could not find Postgres database container (AIO or Compose).
pause
exit /b

:success
echo Backup saved to backup_latest.sql
pause
