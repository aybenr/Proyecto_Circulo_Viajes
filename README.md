# Portal de Solicitudes de Beneficios de Empleados

Aplicación web desarrollada para digitalizar y gestionar las solicitudes de beneficios laborales de los empleados de Círculo de Viajes, reemplazando el trámite físico en papel.

## Descripción general

El sistema permite consultar los beneficios disponibles, registrar nuevas solicitudes y visualizar o eliminar las solicitudes registradas. La aplicación utiliza una interfaz desarrollada con React y un backend con Node.js y Express, que permite gestionar la información mediante una API REST.

## Funcionalidades

- Consultar el catálogo de beneficios disponibles.
- Registrar solicitudes mediante un formulario web.
- Consultar las solicitudes registradas.
- Eliminar solicitudes.
- Validar los datos antes de registrar una solicitud.
- Consultar la documentación de la API mediante Swagger.

## Tecnologías utilizadas

- React: desarrollo de la interfaz de usuario.
- Node.js: entorno de ejecución del backend.
- Express: creación del servidor y los servicios REST.
- Axios: comunicación entre el frontend y el backend.
- React Router: navegación entre las vistas.
- Context API: compartir información entre componentes.
- Hooks: uso de useState, useEffect, useContext y useReducer.
- Swagger / OpenAPI: documentación de los servicios de la API.

## Estructura del proyecto

- server.js: configuración del servidor y los servicios de la API.
- datos.json: información inicial de beneficios y solicitudes.
- swagger.yaml: documentación de la API bajo OpenAPI 3.0.3.
- estilos.css: estilos generales de la aplicación.
- frontend/: proyecto React.
- frontend/src/App.jsx: vistas y componentes principales.
- frontend/src/context/RequestContext.jsx: gestión compartida de las solicitudes.

## Ejecución local

1. Instalar Node.js.
2. Instalar las dependencias del proyecto principal y del frontend.
3. Iniciar el backend desde la carpeta principal con node server.js.
4. Iniciar el frontend desde la carpeta frontend con npm run dev.
5. Abrir en el navegador la dirección indicada por Vite, normalmente http://localhost:5173.

## Documentación de la API

Con el backend en ejecución, la documentación Swagger está disponible en:

http://localhost:3005/api-docs

Servicios implementados:

- GET /api/beneficios: consulta los beneficios disponibles.
- GET /api/solicitudes: consulta las solicitudes registradas.
- POST /api/solicitudes: registra una nueva solicitud.
- DELETE /api/solicitudes/{id}: elimina una solicitud por su identificador.

## Consideración sobre los datos

En esta versión académica, las solicitudes se administran en memoria desde el backend y los datos iniciales se cargan desde datos.json. Por tanto, los cambios realizados se pierden al reiniciar el servidor y se recupera la información inicial del archivo.

## Contexto académico

Proyecto desarrollado como soporte práctico para la Actividad 4 – Desarrollo de Aplicaciones Web II, de la Corporación Universitaria Iberoamericana.