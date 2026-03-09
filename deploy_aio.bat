
@echo off
echo Starting All-in-One Deployment to Docker Hub (bloqmey)...

echo 1. Building Monolithic Image (This may take a while)...
docker build -f Dockerfile.aio -t bloqmey/leakcheck:latest .

echo 2. Pushing to Docker Hub...
docker push bloqmey/leakcheck:latest

echo Done! Users can now run: docker run -p 80:80 bloqmey/leakcheck
pause
