# - - - - - - - - - - - - - - - - izajexp - - - - - - - - - - - - - - - - 

"izajexp" es una aplicación diseñada para diseñar y simular levantamientos de carga y planes de izajes.
Ayuda al supervisor, capataz y maestros mayores para calcular factores
que influyan en los parámetros de seguridad para concretar si los levantamientos son optimos.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Preparación](#preparación)
- [Construcción](#construcción)
- [Ejecución](#ejecución)
- [Finalización](#finalización)

## Requisitos

Para ejecutar el proyecto en tu sistema necesitas lo siguiente:

* **Docker**
* **Acceso a internet.**
* **Expo Go**. App para visualizar el proyecto en tu dispositivo móvil.

### Instalación de Docker en tu sistema.

Sigue los pasos a continuación para instalar Docker en tu sistema operativo:

#### 1.  Descargar Docker Desktop :
-   Descarga la versión de **Docker Desktop** que corresponda a tu sistema operativo.

    - Docker Desktop para Windows
    - Docker Desktop para Linux
    - Docker Desktop para Mac

#### 2. Instalar Docker Desktop :
-   Sigue los pasos que correspondan para tu sistema operativo.

#### 3. Verifica la instalación :
-   Para confirmar la instalación en tu sistema abre una terminal y ejecuta el siguiente comando:
~~~
docker --version
~~~

## Instalación

#### 1. Instalar Git en tu sistema (si ya lo tienes puedes ignorar este paso)

- #### Linux:
    - #### Actualiza la lista de paquetes, instala Git y verifica la instalación.
        ~~~
        sudo apt update
        sudo apt install git -y
        git --version
        ~~~

- #### macOS:
    - #### Usando Homebrew

    1.  Asegurate de tener Homebrew instalado. Si no lo tienes, instálalo siguiendo las instrucciones que se encuentran en este sitio: https://brew.sh/

    2.  Instala Git y verficia la instalación:
    
        ~~~
        brew install git
        git --version
        ~~~ 
    - #### Sin Homebrew

    1.  Descarga el instalador de Git desde el sitio oficial: https://git-scm.com/
    2.  Sigue las instrucciones del instalador.

- #### Windows:
    - #### Descarga el instalador de Git desde el sitio oficiaL: https://git-scm.com/
    - #### Ejecuta el instalador (ajusta las opciones según tu preferencia)
    - #### Verifica la instalación:
    
    Abre **Git Bash** o **PowerShell** y ejecuta:

    ~~~
    git --version
    ~~~


## Preparación

#### 1. Clonar el repositorio:

-  Abre una terminal y navega el directorio donde deseas clonar el proyecto:
-  Clona el repositorio usando el siguiente comando :   
    ~~~
    git clone <URL_REPOSITORIO>
    ~~~

- Ingresa al directorio del proyecto usando el siguiente comando:
    ~~~
    cd <NOMBRE_DIRECTORIO>
    ~~~

#### 2. Verificar el Dockerfile en las carpetas backend y frontend:

- Asegurate que el archivo **Dockerfile** está tanto en la carpeta backend como en la carpeta frontend. Este archivo contiene todas las instrucciones necesarias para construir la imagen Docker de cada área.


## Construcción

#### 1. Construir la imagen Docker:

- #### Imagen Backend
    - En la carpeta raíz del proyecto, acceder a la carpeta backend con el siguiente comando:

        ~~~
        cd backend
        ~~~
    - Ejectuar el siguiente comando:

        ~~~
        docker build -t imagen_backend .
        ~~~
    - Esto construirá la imagen a partir del Dockerfile de la carpeta backend ya incluido en el repositorio.
    - La opción **-t** etiqueta la imagen como **imagen_backend**

- #### Imagen Frontend
    - En la carpeta raíz del proyecto, acceder a la carpeta frontend con el siguiente comando:

        ~~~
        cd frontend
        ~~~
    - Ejectuar el siguiente comando:

        ~~~
        docker build -t imagen_frontend .
        ~~~
    - Esto construirá la imagen a partir del Dockerfile de la carpeta frontend ya incluido en el repositorio.
    - La opción **-t** etiqueta la imagen como **imagen_frontend**


## Ejecución

- #### Ejecutar el contenedor
    #### 1. Ejecutar contenedor del backend:

    - Traslado a carpeta correspondiente:
    - #### Si me encuentro en la carpeta raiz:
        ~~~
        cd backend
        ~~~
    - #### Si me encuentro en la carpeta frontend:
        ~~~
        cd ..
        cd backend
        ~~~
    - #### Una vez en la carpeta backend:
        ~~~
        docker run -d -p 3000:3000 --name contenedor_backend imagen_backend
        ~~~
    - #### Para verificar su funcionamiento ejecutar:
        ~~~
        docker ps
        ~~~
    
    #### 2. Ejecutar contenedor del frontend:

    - Traslado a carpeta correspondiente:
    - #### Si me encuentro en la carpeta backend:
        ~~~
        cd ..
        cd frontend
        ~~~
    - #### Si me encuentro en la carpeta raiz:
        ~~~
        cd frontend
        ~~~
    - #### Una vez en la carpeta frontend:
        ~~~
        docker run -it --name contenedor_frontend -p 19000:19000 -p 19001:19001 -p 19002:19002 imagen-frontend
        ~~~
        **OJO:** Para visualizar el proyecto debes escanear el codigo QR con tu dispositivo móvil en **la misma conexión Wi-Fi de tu sistema operativo.**

## Finalización

Para detener y eliminar el contenedor, usa los siguientes comandos.

- ### Frontend

    #### Detener el servidor:
    - **Windows y Linux:**  Presionar Ctrl+C.
    - **macOS**: Presionar Ctrl + C o Cmd + C.

    #### Detener el contenedor:

    ~~~
    docker stop contenedor_frontend
    ~~~

    #### Eliminar el contenedor:

    ~~~
    docker rm contenedor_frontend
    ~~~

    #### Eliminar la imagen:

    ~~~
    docker rmi imagen_frontend
    ~~~

- ### Backend

    #### Detener el contenedor:

    ~~~
    docker stop contenedor_backend
    ~~~

    #### Eliminar el contenedor:

    ~~~
    docker rm contenedor_backend
    ~~~

    #### Eliminar la imagen:

    ~~~
    docker rmi imagen_backend
    ~~~   