# izajexp

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

* **Docker:** 27.3.1
* **Acceso a internet desde tu ordenar**

Para utilizar la aplicación móvil necesitas lo siguiente:
* **Expo Go:** 2.32.12 Aplicación disponible en Google Play Store y Apple Store.
* **Acceso a internet desde tu dispositivo móvil**



### Tecnologías utilizadas en el entorno de desarrollo

Consultar [CONTRIBUTING.md](./CONTRIBUTING.md). para conocer detalles adicionales sobre el entorno de desarrollo y las configuraciones empleadas.



#### Entorno de trabajo:
-   Este proyecto en el siguiente entorno de desarrollo a describir, por eso se recomienda utilizar el mismo entorno para evitar problemas de compatibilidad.

    - Oracle VirtualBox 7.1.4
    - Ubuntu 22.04
    - Docker 27.3.1
    - Git 2.38.1
    - Node.js 18.20.4
    - npm 10.7.0

-   Para montar un entorno de desarrollo como el que se utilizó en el proyecto es necesario hacer reglas de redireccionamiento de puertos en VirtualBox, en este caso se utilizó Ubuntu 22.04.

    - Primero, crear las maquinas virtuales en VirtualBox, en este caso se utilizó Ubuntu 22.04
    - Segundo, ir a configuración de cada una de ellas y en la sección de red debe estar seleccionada la opción de red NAT.
    - Tercero, en opciones avanzadas de la sección de red, en la opción "reenvio de puertos" hay que agregar una regla de redireccionamiento de puertos, en este caso se crearon reglas para los puertos:
        - 3000 (Puerto para desplegar el backend desarrollado en Node.js)
        - 19000 (Puerto para comunicación principal con Expo Go)
    - La regla deberia quedar mas o menos asi:

        **Para el backend**
        ~~~
        Nombre: backend
        Protocolo: TCP
        IP anfitrion: (La IP de tu computadora)
        Puerto anfitrion: 3000
        IP invitado: (La IP de tu maquina virtual)
        Puerto invitado: 3000
        ~~~
        **...y para el frontend**
        ~~~
        Nombre: frontend
        Protocolo: TCP
        IP anfitrion: (La IP de tu computadora)
        Puerto anfitrion: 19000
        IP invitado: (La IP de tu maquina virtual)
        Puerto invitado: 19000
        ~~~
### Instalación de Docker en tu sistema.

#### 1. Actualizar el sistema:
~~~
sudo apt-get update && sudo apt-get upgrade -y
~~~

#### 2. Eliminar versiones anteriores de Docker (si existen):
~~~
sudo apt-get remove docker docker-engine docker.io containerd runc
~~~

#### 3. Instalar paquetes necesarios:
~~~
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
~~~

#### 4. Agregar la clave GPG oficial de Docker:
~~~
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
~~~

#### 5. Agregar el repositorio de Docker:
~~~
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
~~~

#### 6. Actualizar la lista de paquetes:
~~~
sudo apt-get update
~~~

#### 7. Instalar Docker Engine versión 27.3.1 :
~~~
sudo apt-get install docker-ce=5:27.3.1-1~ubuntu.22.04~jammy docker-ce-cli=5:27.3.1-1~ubuntu.22.04~jammy containerd.io
~~~

#### 8. Verificar versión:
~~~
docker --version
~~~

#### 9. Para verificar que la instalación puede ejecutar este comando:
~~~
sudo docker run hello-world
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


## Preparación

#### 1. Clonar el repositorio:

-  Abre una terminal y navega el directorio donde deseas clonar el proyecto:
-  Clona el repositorio usando el siguiente comando :   
    ~~~
    git clone https://github.com/alonsoalejara/izajExp
    ~~~

- Ingresa al directorio del proyecto usando el siguiente comando:
    ~~~
    cd izajExp
    ~~~

#### 2. Verificar el Dockerfile en las carpetas backend y frontend:

- Asegurate que el archivo **Dockerfile** está tanto en la carpeta backend como en la carpeta frontend. Este archivo contiene todas las instrucciones necesarias para construir la imagen Docker de cada área.


## Construcción

#### 1. Construir la imagen Docker del backend:

- #### Imagen Backend
    - En la carpeta raíz del proyecto, acceder a la carpeta backend con el siguiente comando:

        ~~~
        cd backend
        ~~~
    - Ejectuar el siguiente comando:

        ~~~
        sudo docker build -t imagen_backend .
        ~~~
    - Esto construirá la imagen a partir del Dockerfile de la carpeta backend ya incluido en el repositorio.
    - La opción **-t** etiqueta la imagen como **imagen_backend**

#### 1.2. Configurar .env:

- #### Navegar hasta este directorio (dentro de la carpeta backend):
    ~~~
    cd src/config
    ~~~

- #### Verificar que este el archivo .env.example con este comando:
    ~~~
    ls -a
    ~~~

- #### Renombrar a .env con el siguiente comando:
    ~~~
    mv .env.example .env
    ~~~

- #### Editar el contenido del archivo con las variables de entorno:
    ~~~
    nano .env
    ~~~

#### 2. Construir la imagen Docker del frontend:

- #### Imagen Frontend
    - En la carpeta raíz del proyecto, acceder a la carpeta frontend con el siguiente comando:

        ~~~
        cd frontend
        ~~~
    - Ejectuar el siguiente comando:

        ~~~
        sudo docker build -t imagen_frontend .
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
        sudo docker run -d -p 3000:3000 --name contenedor_backend imagen_backend
        ~~~
    - **-d:** Ejecuta el contenedor en segundo plano, permitiendo que el terminal quede libre para otros comandos.

    - **-p -3000:3000** Mapea el puerto 3000 del host al puerto 3000 del contenedor, facilitando el acceso a servicios que el contenedor pueda estar ejecutando en ese puerto.
    - #### Para verificar su funcionamiento ejecutar:
        ~~~
        sudo docker ps
        ~~~
    - #### Utilizar el siguiente comando para verificar que todos los pasos en la carpeta backend de la imagene y contenedor:
        ~~~
        sudo docker logs contenedor_backend
        ~~~
    
    - #### Si todo esta en orden la consola debería mostrar el siguiente mensaje:
        ~~~
        => Conectado a la base de datos
        => Servidor corriendo en 0.0.0.0:3000/api
        => API Iniciada exitosamente
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
        sudo docker run -it --name contenedor_frontend -p 19000:19000 imagen_frontend
        ~~~
    - **-it:** Combina las opciones **-i** (mantiene la entrada estándar abierta) y **-t** (asigna una terminal), permitiendo la interacción directa con el contenedor a través de la línea de comandos.
    - **-p 19000:19000:** Mapea el puerto 19000 del host al mismo puerto dentro del contenedor, permitiendo el acceso a servicios que el contenedor pueda estar ejecutando en ese puerto. 

        **OJO:** Para visualizar el proyecto debes escanear el codigo QR con tu dispositivo móvil en **la misma conexión Wi-Fi de tu sistema operativo.**

## Finalización

Para detener y eliminar el contenedor, usa los siguientes comandos.

- ### Frontend

    #### Detener el servidor:
    * Presionar Ctrl+C.

    #### Detener el contenedor:

    ~~~
    sudo docker stop contenedor_frontend
    ~~~

    #### Eliminar el contenedor:

    ~~~
    sudo docker rm contenedor_frontend
    ~~~

    #### Eliminar la imagen:

    ~~~
    sudo docker rmi imagen_frontend
    ~~~

- ### Backend

    #### Detener el contenedor:

    ~~~
    sudo docker stop contenedor_backend
    ~~~

    #### Eliminar el contenedor:

    ~~~
    sudo docker rm contenedor_backend
    ~~~

    #### Eliminar la imagen:

    ~~~
    sudo docker rmi imagen_backend
    ~~~   