# API REST para Todo List

Una API REST sencilla para gestionar listas de tareas pendientes (To-do lists) desarrollada con Node.js y Express.

## Descripción

Esta API implementa un sistema para gestionar usuarios, listas de tareas y tareas individuales siguiendo los principios REST. La aplicación simula un repositorio de datos en memoria sin necesidad de configurar una base de datos real.

## Estructura de la base de datos

La API simula la siguiente estructura de datos:

- **users**: Almacena los datos del usuario
  - id (PK)
  - firstName
  - lastName
  - email

- **todos**: Almacena las listas de tareas que puede tener cada usuario
  - id (PK)
  - title
  - keywords
  - userId (FK)

- **tasks**: Almacena las tareas específicas de cada lista
  - id (PK)
  - title
  - completed
  - todoId (FK)
  - userId (FK)

## Requisitos previos

- Node.js (versión 14.x o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

1. Clonar o descargar este repositorio
```bash
git clone [url-del-repositorio]
cd todo-api
```

2. Instalar dependencias
```bash
npm install
```

## Ejecución

Para iniciar el servidor en modo normal:
```bash
npm start
```

Para iniciar el servidor en modo desarrollo (con reinicio automático):
```bash
npm run dev
```

El servidor se ejecutará en: http://localhost:5000

## Endpoints

### Usuarios

#### Obtener todos los usuarios
```
GET /users
```
Respuesta: Array de usuarios
```json
[
  {
    "id": 1,
    "firstName": "Daniel",
    "lastName": "Calvo",
    "email": "dcalvo@polpocr.com"
  },
  {
    "id": 2,
    "firstName": "Katherine",
    "lastName": "Calvo",
    "email": "kcalvo@polpocr.com"
  }
]
```

#### Obtener un usuario específico
```
GET /users/:id
```
Respuesta: Detalles del usuario
```json
{
  "id": 1,
  "firstName": "Daniel",
  "lastName": "Calvo",
  "email": "dcalvo@polpocr.com"
}
```

#### Crear un nuevo usuario
```
POST /users
```
Cuerpo de la solicitud:
```json
{
  "firstName": "Diana",
  "lastName": "Mejía",
  "email": "dmejia@polpocr.com"
}
```
Respuesta: Usuario creado con ID asignado
```json
{
  "id": 3,
  "firstName": "Diana",
  "lastName": "Mejía",
  "email": "dmejia@polpocr.com"
}
```

### Listas de tareas (Todos)

#### Obtener todas las listas de un usuario
```
GET /users/:id/todos
```
Respuesta: Array de listas
```json
[
  {
    "id": 1,
    "title": "Universidad",
    "keywords": ["estudios", "importante", "academia"],
    "userId": 1
  },
  {
    "id": 2,
    "title": "Casa",
    "keywords": ["oficio", "necesario", "orden"],
    "userId": 1
  }
]
```

#### Obtener una lista específica con sus tareas
```
GET /todos/:id
```
Respuesta: Lista y sus tareas
```json
{
  "id": 1,
  "title": "Universidad",
  "keywords": ["estudios", "importante", "academia"],
  "userId": 1,
  "todos": [
    {
      "id": 1,
      "title": "Estudiar para el examen de programación",
      "completed": 0,
      "todoId": 1,
      "userId": 1
    },
    {
      "id": 2,
      "title": "Ir a clases",
      "completed": 1,
      "todoId": 1,
      "userId": 1
    }
  ]
}
```

### Tareas (Tasks)

#### Crear una nueva tarea para una lista
```
POST /todos/:id/task
```
Cuerpo de la solicitud:
```json
{
  "title": "Terminar tesis de grado",
  "completed": 0
}
```
Respuesta: Tarea creada
```json
{
  "id": 5,
  "title": "Terminar tesis de grado",
  "completed": 0,
  "todoId": 1,
  "userId": 1
}
```

## Notas

- Esta API simula un repositorio de datos en memoria, por lo que los datos no persistirán entre reinicios del servidor.
- Los IDs se generan automáticamente y se incrementan para cada nuevo registro.

## Tecnologías utilizadas

- Node.js
- Express
- body-parser
- nodemon (para desarrollo)

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)