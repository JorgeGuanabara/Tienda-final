# StoreAdmin - Next.js + Tailwind CSS + MySQL2

Aplicación web CRUD para administrar las tablas `productos`, `usuarios`, `categorias` y `pedidos` conectada a MySQL mediante `mysql2`.

## 1. Instalación y configuración

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta el script SQL ubicado en `database/schema.sql` en tu servidor MySQL (local o en la nube como Railway/Aiven).
3. Edita el archivo `.env` con las credenciales de tu base de datos:
   ```env
   DB_HOST=tu_host
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_NAME=db_tienda_jorge
   ```
4. Ejecuta el servidor en desarrollo:
   ```bash
   npm run dev
   ```

## 2. Subir a GitHub

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
# Copia los archivos del proyecto dentro de la carpeta clonada
git status
git add .
git commit -m "Proyecto CRUD NextJS con MySQL2 y Tailwind CSS"
git push
```

## 3. Despliegue en la nube (Vercel recomendado para MySQL2)

1. Importa tu repositorio de GitHub en **Vercel**.
2. En **Environment Variables**, agrega `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME`.
3. Haz clic en **Deploy**.
