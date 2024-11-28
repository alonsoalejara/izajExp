# Establecer la imagen base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app/backend

# Copiar los archivos del backend a la ubicación /app en el contenedor
COPY . /app/backend

# Instalar dependencias
RUN npm install

# Exponer el puerto en el que la app escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]