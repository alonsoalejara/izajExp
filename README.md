# izajExp

izajExp es una aplicación diseñada para diseñar y simular levantamientos de carga y planes de izajes.
Ayuda al supervisor, capataz y maestros mayores para calcular factores
que influyan en los parámetros de seguridad para concretar si los levantamientos son optimos.

## Tabla de Contenidos

- [Entorno](#entorno)
- [Requisitos](#requisitos)
- [Instalación](#instalación)

## Entorno utilizado

- **Git:** Control de versiones. 
- **Visual Studio Code:** IDE recomendado para el desarrollo del proyecto
- **Node.js** Entorno de ejecución de Javascript
- **React** Biblioteca para interfaces de usuario
- **React Native** Framework para desarrollo móvil
- **Expo** Herramienta para desarrollo y prueba de aplicaciones React Native
- **MongoDB** Base de datos no relacional
- **Express.js** Framework web para Node.js

## Requisitos

Asegurate de tener instalados los siguientes programas:

- **Node.js:** v18.20.4 LTS (Recomendado para el entorno de desarrollo)
- **npm:** Gestor de paquetes de Node.js 
- **Git:** Clonación de repositorio.

## Instalación

Sigue los pasos a continuación para instalar y configurar el entorno:

### 1.  Actualizar sistema :
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

## 4. Instalar Visual Studio Code

- #### Descargar el paquete .deb
~~~
sudo apt install wget -y
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install code
~~~

- #### Abrir Visual Studio Code
~~~
code
~~~

## 5. Clonar repositorio
~~~
git clone https://github.com/alonsoalejara/izajExp.git
cd izajExp
~~~

## 6. Instalar dependencias:

- #### Dentro de la carpeta izajExp:
~~~
npm install
~~~

## 7. Instalar Simulador de Android:

- #### Actualizar el sistema:
~~~
sudo apt update
~~~

- #### Instalar Android Studio con Snap
~~~
sudo snap install android-studio --clasic
~~~

- #### Abrir Android Studio
~~~
android-studio
~~~