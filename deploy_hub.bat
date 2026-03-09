
@echo off
echo Starting Deployment to Docker Hub (bloqmey)...

echo 1. Building Images...
docker-compose build

echo 2. Tagging Images...
docker tag leakcheck-backend bloqmey/backend:latest
docker tag leakcheck-frontend bloqmey/frontend:latest

echo 3. Pushing Images...
docker push bloqmey/backend:latest
docker push bloqmey/frontend:latest

echo Deployment Complete.
pause
