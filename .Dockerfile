# Imagen base
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto (usa el que indiques en .env)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
