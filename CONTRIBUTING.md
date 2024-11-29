# Guía de contribución a IzajExp

Este documento te ayudará a entender cómo puedes colaborar de forma correcta y adecuada con el proyecto IzajExp, una aplicación móvil diseñada para la gestión y simulación de levantamientos de cargas en proyectos de izajes.

## Tabla de Contenidos

- [¿Cómo puedo contribuir?](#contribución)
- [Estándares de estilo y formato de código](#estándares-de-estilo-y-formato-de-código)
- [¿Cómo configurar el entorno de desarrollo?](#configuración-del-entorno-de-desarrollo)
- [Pruebas de código](#pruebas-de-código)
- [¿Cómo enviaré Pull Request?](#enviar-pull-request)

## Contribución

1. Realiza un **fork** del repositorio en tu cuenta de GitHub.
2. Crea una nueva rama para los cambios que deseas realizar.  
**Usa un nombre descriptivo como por ejemplo:**
~~~
feat/nueva-funcionalidad
fix/correccion-error
~~~ 
3. Realiza los cambios y prueba tu trabajo en tu entorno local.
4. Envía un **Pull Request (PR)** al repositorio principal. Asegúrate de incluir: 
    - Descripción de los cambios realizados.
    - Razón de por qué son necesarios. 
    - Problemas resueltos o funcionalidades añadidas.

## Estándares de estilo y formato de código

#### Para mantener la consistencia del proyecto:
1. Sigue la pauta de estilos de **JavaScript Standard Style** o **Airbnb JavaScript Style Guide.**
2. Utilizar las convenciones de escritura **Kebab-case** para los archivos en el backend y **PascalCase** para los archivos en el frontend. 
3. Documenta el código con comentarios claros y concisos.
4. Utiliza herramientas como **ESLint** para verificar que el código cumple con los estándares establecidos.

## Configuración del entorno de desarrollo

### Tecnologias utilizadas en entorno de desarrollo:

Estos son las tecnologias utilizadas en el desarrollo del proyecto:

- **Git v2.38.1.** Control de versiones.
- **Visual Studio Code v1.95.3.** IDE recomendado para el desarrollo del proyecto.
- **Node.js v18.20.4.** Entorno de ejecución de JavaScript.
- **npm v10.7.0.** Gestor de paquetes de Node.js.
- **MongoDB o MongoDB Atlas.** Base de datos no relacional.
- **React v18.3.1.** Biblioteca para el desarrollo de interfaces de usuario.
- **React Native v0.76.2.** Framework para desarrollo móvil.
- **Expo v52.0.7.** Herramienta para desarrollo y prueba de aplicaciones React Native.
- **Express.js v4.21.1.** Framework web para el backend.
- **Docker.** Para contenerización de backend y frontend.
- **Android Studio Koala Feature Drop 2024.1.2.** Simulador de dispositivos Android.

### Configuración:

#### 1. **Clona el repositorio.**
~~~
git clone https://github.com/usuario/izajexp.git
cd izajexp
~~~
#### 2. **Instala las dependencias del proyecto:**
- Backend
  ```
  cd backend
  npm install
  ```
- Frontend
  ```
  cd frontend
  npm install
  ```
#### 3. **Configura las variables de entorno en un archivo .env:** 
*Consulta el archivo **.env.example** para los valores requeridos.*

#### 4. **Ejecuta el servidor:**
- Backend
  ```
  cd backend
  npm run start
  ```
- Frontend
  ```
  cd frontend
  npx expo start
  ```

## Pruebas de código

Antes de enviar tus cambios, asegúrate de que el proyecto funcione correctamente ejecutando las pruebas unitarias. Verifica que todos los casos pasen y el código se ejecute sin errores.

## Enviar Pull Request

#### Sigue estos pasos para enviar un PR correctamente:

1. Verifica que:
    - **Todas** las pruebas pasen.
    - El código cumpla con los **estándares de estilo.**
    - La documentación esté **actualizada.**

2. Abre un PR indicando:
    - La rama del destino **(main o develop).**
    - Una descripción detallada de los cambios realizados, por qué son necesarios y cualquier información adicional relevante.

#### ¡Gracias por tu aporte al desarrollo de IzajExp! 
**Tu colaboración es importante** para continuar mejorando la aplicación y hacerla más útil para sus usuarios.