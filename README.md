# 🕵️‍♂️ CheakLeaks OS

**CheakLeaks OS** es un motor de búsqueda de brechas de seguridad autoalojado, diseñado con una estética "Hacker/Cyber" de alta calidad. Simula la experiencia de consultar bases de datos de la deep web en busca de correos, contraseñas y hashes comprometidos, incluyendo un mapa visual de amenazas en vivo y registros (logs) del sistema en tiempo real.

![CheakLeaks OS Dashboard](./1.1.png)

## ✨ Características
- **Interfaz "Cyber" Total**: Detalles en neón, fondos oscuros y una experiencia de escritorio "terminal".
- **Mapa de Amenazas Global**: Representación visual de consultas activas y tráfico simulado de ataques globales.
- **System Logs en Vivo**: Panel de texto en scroll simulando la actividad del backend y los intentos de conexión.
- **Buscador Deep Web**: Busca por Correo o Hash (MD5/SHA1). Devuelve datos simulados indicando si el objetivo fue encontrado en una brecha, y provee enlaces de acceso a la "Deep Web" para las fuentes de datos en crudo.
- **Autenticación Robusta**: Gestión de sesiones por JWT con políticas de contraseñas seguras.
- **Despliegue Todo-en-Uno (All-In-One)**: Frontend, Backend y la base de datos PostgreSQL están empaquetados en una única imagen de Docker altamente portable (gestionada con Supervisor).
- **Herramientas de Disaster Recovery**: Incluye scripts `.bat` para respaldar (backup) y restaurar la base de datos fácilmente en Windows.

## 🚀 Inicio Rápido (Docker Run) - Recomendado
La forma más fácil de arrancar la aplicación es usando la imagen "todo-en-uno" precompilada en Docker Hub. **No necesitas descargar ni compilar el código fuente**, solo tener Docker.

1. Asegúrate de tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Abre tu terminal y ejecuta este comando de una sola línea:
   ```bash
   docker run -d -p 80:80 --name cheakleaks bloqmey/leakcheck:latest
   ```
3. Abre tu navegador y entra a: **http://localhost**
4. **Crea tu cuenta**: Haz clic en "Register" para crear una cuenta nueva y empezar a utilizar el buscador.

## 🐳 Despliegue con Docker Compose
Si prefieres gestionar el *Frontend* y *Backend* como contenedores separados (para modificar variables de entorno más fácilmente), puedes usar `docker-compose.yml`.

1. Crea un archivo llamado `docker-compose.yml` en cualquier carpeta de tu PC:
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
2. Inicia los servidores:
   ```bash
   docker-compose up -d
   ```
3. Entra a la web en **http://localhost:3000** y regístrate.

## 🛠️ Desarrollo y Compilación Local
Si quieres editar el código o compilar las imágenes en tu propia máquina:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/bloqmey28/CheakLeaks.git
   cd CheakLeaks
   ```
2. **Compilación Estándar**:
   Para construir y subir las imágenes separadas de backend/frontend, usa:
   ```cmd
   deploy_hub.bat
   ```
3. **Compilación Todo-en-Uno (AIO)**:
   Para construir la super-imagen monolítica, usa el script:
   ```cmd
   deploy_aio.bat
   ```

## 📂 Utilidades Incluidas (Windows)
Este repositorio cuenta con varios scripts `*.bat` para facilitar su administración:
- `backup_db.bat`: Extrae un archivo `pg_dump` de la base de datos PostgreSQL en vivo para copias de seguridad.
- `restore_db.bat`: Restaura la base de datos a partir de un archivo de backup existente.
- `deploy_hub.bat`: Automatiza el *build* y *push* a Docker Hub de las imágenes separadas.
- `deploy_aio.bat`: Automatiza el proceso con el archivo especial `Dockerfile.aio`.
