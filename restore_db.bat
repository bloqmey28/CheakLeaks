@echo off
echo WARNING: This will overwrite the current database with backup_latest.sql
set /p "confirm=Type 'yes' to continue: "
if not "%confirm%"=="yes" exit

echo Restoring Database...

FOR /F "tokens=*" %%i IN ('docker ps -q -f "ancestor=bloqmey/leakcheck:latest"') DO SET AIO_CONTAINER=%%i

IF NOT "%AIO_CONTAINER%"=="" (
    echo Found All-in-One container. Restoring...
    type backup_latest.sql | docker exec -i %AIO_CONTAINER% psql -U leakcheck leakcheck_db
    goto :success
)

echo Trying direct docker exec for compose db container...
type backup_latest.sql | docker exec -i leakcheck-db-1 psql -U leakcheck leakcheck_db 2>nul
if %ERRORLEVEL% equ 0 goto :success

echo Trying docker-compose method...
type backup_latest.sql | docker-compose exec -T db psql -U leakcheck leakcheck_db 2>nul
if %ERRORLEVEL% equ 0 goto :success

echo Error: Could not find Postgres database container.
pause
exit /b

:success
echo Database Restored Successfully.
pause
