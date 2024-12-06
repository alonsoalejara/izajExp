# Usar Ubuntu como imagen base
FROM ubuntu:22.04

# Establecer el directorio de trabajo
WORKDIR /app

# Actualizar los paquetes e instalar las dependencias necesarias
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    unzip \
    wget \
    curl \
    && apt-get clean

# Instalar Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Verificar la instalación de Node.js
RUN node -v

# Copiar los archivos de dependencias (package.json y package-lock.json)
COPY package.json package-lock.json ./ 

# Copiar todo el contenido del proyecto al contenedor
COPY . .

# Instalar las dependencias utilizando npm
RUN npm install

# Instalar expo-cli globalmente
RUN npm install -g expo-cli

# Instalar @expo/ngrok globalmente
RUN npm install -g @expo/ngrok

# Exponer puertos necesarios para Expo
EXPOSE 8081 19000

# Comando para iniciar Expo con túnel
CMD ["npx", "expo", "start", "--tunnel"]