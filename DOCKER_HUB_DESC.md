
# 🕵️‍♂️ LeakCheck OS

**LeakCheck OS** is a self-hosted breach search engine with a "Hacker/Cyber" aesthetic.
Capable of finding emails and hashes in simulated leak databases with deep web access links.

## 🚀 How to Run (Quick Start)

You do **NOT** need to download any code. just Docker.

1. Create a file named `docker-compose.yml` on your computer.
2. Paste the following content into it:

```yaml
version: '3.8'

services:
  frontend:
    image: bloqmey/frontend:latest
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: always

  backend:
    image: bloqmey/backend:latest
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - DB_HOST=db
      - DB_USER=leakcheck
      - DB_PASSWORD=secure_password
      - DB_NAME=leakcheck_db
      - JWT_SECRET=super_secret_key
      - CORS_ORIGIN=http://localhost:3000
    depends_on:
      db:
        condition: service_healthy
    restart: always

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=leakcheck
      - POSTGRES_PASSWORD=secure_password
      - POSTGRES_DB=leakcheck_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U leakcheck"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always

volumes:
  pgdata:
```

3. Open a terminal in that folder and run:
   ```bash
   docker-compose up -d
   ```

4. Open your browser: **http://localhost:3000**
   - **Admin User**: `alejandro.palomo.espino@ieselcalamot.com`
   - **Password**: `Asdqwe123!`
