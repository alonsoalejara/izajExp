# izajExp

izajExp es una aplicación diseñada para diseñar y simular levantamientos de carga y planes de izajes.
Ayuda al supervisor, capataz y maestros mayores para calcular factores
que influyan en los parámetros de seguridad para concretar si los levantamientos son optimos.

## Tabla de Contenidos

- [Entorno](#entorno)
- [Requisitos](#requisitos)
- [Instalación](#instalación)

## Entorno utilizado

- **Git v2.38.1.** Control de versiones. 
- **Visual Studio Code v1.95.3.**  IDE recomendado para el desarrollo del proyecto
- **Node.js v18.20.4.**  Entorno de ejecución de Javascript
- **React v.18.3.1.**  Biblioteca para interfaces de usuario
- **React Native v.0.76.2.**  Framework para desarrollo móvil
- **Expo v.52.0.7.**  Herramienta para desarrollo y prueba de aplicaciones React Native
- **Express.js v.4.21.1.**  Framework web para Node.js
- **MongoDB** Base de datos no relacional

## Requisitos

Asegurate de tener instalados los siguientes programas:

- **Node.js: v18.20.4 LTS**  (Recomendado para el entorno de desarrollo)
- **npm: v10.7.0** Gestor de paquetes de Node.js 
- **Git: v2.38.1** Clonación de repositorio.
- **MongoDB Atlas** o conexión a MongoDB.

## Instalación

Sigue los pasos a continuación para instalar y configurar el entorno:

## 1.  Actualizar sistema :
~~~
sudo apt update && sudo apt upgrade -y
~~~

## 2. Instalar Git : 
~~~
sudo apt install git -y
~~~
- #### Verificar instalación :
~~~
git --version
~~~
- #### Configurar tu nombre y correo para Git
~~~
git config --global user.name nombre
git config --global user.email correo
~~~

## 3. Instalar Node.js y npm

- #### Instalar curl
~~~
sudo apt install curl -y
~~~ 

- #### Descargar e instalar Node.js con nvm (Node Version Manager)
~~~
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 18.20.4
nvm use 18.20.4 
~~~

## 4. Clonar repositorio
~~~
git clone https://github.com/alonsoalejara/izajExp.git
~~~

## 5. Instalar dependencias:

- #### Dentro de la carpeta backend:
~~~
cd backend
npm install
~~~

- #### Dentro de la carpeta frontend:
~~~
cd frontend
npm install
~~~

## 6. Despliegue de proyecto:

- #### En el backend:
~~~
cd backend
npm run start
~~~

- #### En el frontend:
~~~
cd frontend
npx expo start
~~~