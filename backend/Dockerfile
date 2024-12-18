# Usar Ubuntu como imagen base
FROM ubuntu:22.04

# Establecer el directorio de trabajo
WORKDIR /app/backend

# Actualizar los paquetes e instalar las dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    && apt-get clean

# Instalar Node.js 18 (npm viene con Node.js)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Verificar la instalación de Node.js y npm
RUN node -v
RUN npm -v

# Copiar los archivos de dependencias (package.json y package-lock.json)
COPY package.json package-lock.json ./ 

# Copiar todo el contenido del proyecto al contenedor
COPY . .

# Instalar las dependencias utilizando npm
RUN npm install

# Exponer el puerto en el que la app escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]