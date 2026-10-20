# API de autos deportivos

<div align="justify">

Este proyecto es una API REST desarrollada con Node.js y Express para consultar y administrar un catálogo de autos deportivos. Permite listar todos los autos, buscar un auto por su identificador, registrar nuevos autos, actualizar registros y eliminarlos. Los datos se conservan en un arreglo en memoria, por lo que no se utiliza una base de datos y los cambios se pierden al reiniciar el servidor.

La API también incorpora registro de solicitudes, validación de datos y límites de peticiones mediante `express-rate-limit`. Está pensada como un ejercicio interactivo para practicar rutas HTTP, middleware y operaciones CRUD.

</div>

## Estructura del proyecto

<div align="justify">

El árbol muestra los archivos del proyecto (se omiten las dependencias instaladas dentro de `node_modules`):

</div>

```text
campuslands-express-ratelimit-interactivo/
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
└── src/
    ├── app.js
    ├── data/
    │   └── autosDeportivos.js
    ├── middlewares/
    │   ├── errorHandler.js
    │   ├── logger.js
    │   ├── rateLimiter.js
    │   └── validator.js
    └── routes/
        └── autosDeportivos.routes.js
```

| Ruta o archivo | Responsabilidad |
|---|---|
| `package.json` | Define metadatos, dependencias y comandos npm del proyecto. |
| `package-lock.json` | Fija las versiones resueltas de las dependencias. |
| `.gitignore` | Declara `node_modules` y `package-lock.json` como ignorados por Git; el archivo `package-lock.json` de este repositorio ya está versionado. |
| `src/app.js` | Crea la aplicación Express, configura middleware, expone la ruta de bienvenida, monta el limitador y las rutas de la API, y arranca el servidor. |
| `src/routes/autosDeportivos.routes.js` | Declara las rutas CRUD para el catálogo de autos. |
| `src/data/autosDeportivos.js` | Mantiene el arreglo de autos inicial y una función para restablecerlo. |
| `src/middlewares/logger.js` | Registra en consola la fecha, el método y la URL de cada solicitud. |
| `src/middlewares/rateLimiter.js` | Configura el límite general de la API y el límite específico para crear autos. |
| `src/middlewares/validator.js` | Valida los campos del cuerpo JSON usado al crear o actualizar un auto. |
| `src/middlewares/errorHandler.js` | Registra y devuelve errores capturados por Express. |

## Requisitos e instalación

<div align="justify">

Se requiere Node.js 18 o superior y npm. Desde una terminal, ubícate en la carpeta raíz del proyecto e instala las dependencias declaradas en `package.json`:

</div>

```bash
npm install
```

## Cómo ejecutar el proyecto

| Comando | Uso |
|---|---|
| `npm start` | Inicia la API con `node src/app.js`. |
| `npm run dev` | Inicia la API con `node --watch src/app.js`; el proceso se reinicia al detectar cambios en archivos. |
| `npm test` | Ejecuta el comando configurado para `test/test-api.js` con `NODE_ENV=test`. En la estructura actual no existe la carpeta ni el archivo `test/test-api.js`, por lo que este comando no está listo para ejecutarse. |

<div align="justify">

Por defecto, el servidor escucha en `http://localhost:3000`. Se puede cambiar el puerto asignando la variable de entorno `PORT` antes de iniciar el proceso. Con el servidor en marcha, la ruta de bienvenida está disponible en `http://localhost:3000/`.

</div>

```bash
# Windows PowerShell
$env:PORT=4000; npm start

# macOS / Linux
PORT=4000 npm start
```

## Uso desde Insomnia

<div align="justify">

Inicia el servidor y crea en Insomnia una solicitud para cada operación de la tabla. Usa `http://localhost:3000` como URL base y selecciona `JSON` como formato del cuerpo para las solicitudes `POST` y `PUT`. Todos los endpoints del catálogo están bajo `/api/autosdeportivos`.

La ruta `/` devuelve un mensaje de bienvenida. Aunque ese mensaje actualmente menciona rutas de `/api/videojuegos`, esas rutas no están registradas: las rutas reales son las de autos indicadas en esta documentación.

</div>

| Operación | Método | URL completa | Cuerpo JSON | Respuesta correcta |
|---|---|---|---|---|
| Bienvenida | `GET` | `http://localhost:3000/` | No aplica | `200 OK` con información de bienvenida. |
| Listar autos | `GET` | `http://localhost:3000/api/autosdeportivos` | No aplica | `200 OK` con el total y el arreglo de autos. |
| Buscar por ID | `GET` | `http://localhost:3000/api/autosdeportivos/1` | No aplica | `200 OK` con el auto encontrado. Reemplaza `1` por el ID deseado. |
| Crear auto | `POST` | `http://localhost:3000/api/autosdeportivos` | Ver ejemplo de creación. | `201 Created` con el auto creado. |
| Actualizar auto | `PUT` | `http://localhost:3000/api/autosdeportivos/1` | Ver ejemplo de actualización. | `200 OK` con el auto actualizado. Reemplaza `1` por el ID deseado. |
| Eliminar auto | `DELETE` | `http://localhost:3000/api/autosdeportivos/1` | No aplica | `200 OK` con el auto eliminado. Reemplaza `1` por el ID deseado. |

Ejemplo de cuerpo para `POST`:

```json
{
  "modelo": "McLaren 720S",
  "marca": "McLaren",
  "potenciaHP": 710,
  "precio": 300000
}
```

Ejemplo de cuerpo para `PUT`:

```json
{
  "modelo": "McLaren 720S actualizado",
  "marca": "McLaren",
  "potenciaHP": "720",
  "precio": 310000
}
```

<div align="justify">

Los campos `modelo` y `marca` deben ser textos no vacíos. `potenciaHP` debe representar un número igual o mayor que 100 y `precio` debe ser un número igual o mayor que 0. En la ruta `PUT`, el código actual aplica `.trim()` a `potenciaHP`; por eso, envíalo como texto numérico, como en el ejemplo, para evitar un error. En `POST` se puede enviar como número.

La propiedad de potencia en las respuestas no es uniforme en la implementación actual: los datos iniciales y los actualizados usan `potenciaHp`, mientras que los creados mediante `POST` usan `potenciaHP`. Ten en cuenta esta diferencia al inspeccionar las respuestas.

</div>

### Límites de solicitudes

| Alcance | Límite | Ventana | Efecto |
|---|---:|---:|---|
| Rutas bajo `/api/` | 5 solicitudes por IP | 60 segundos | Al excederlo, responde `429 Too Many Requests`. |
| Creación con `POST /api/autosdeportivos` | 3 solicitudes por IP | 60 segundos | Añade un límite específico para registrar autos; también se aplica el límite general de `/api/`. |

<div align="justify">

Los contadores de límite se aplican por IP y se gestionan en memoria. Si se excede un límite, espera a que transcurra la ventana correspondiente antes de volver a probar. Las respuestas del limitador incluyen encabezados estándar de rate limit.

</div>

### Validaciones y respuestas de error

| Caso | Código HTTP | Descripción |
|---|---:|---|
| Cuerpo JSON o campos requeridos inválidos en `POST`/`PUT` | `400` | La solicitud no supera la validación de datos. |
| ID no numérico en una ruta con `:id` | `400` | El identificador debe ser numérico. |
| ID inexistente en `GET` o `PUT` | `404` | No se encontró el auto solicitado. |
| ID inexistente en `DELETE` | `400` | La implementación informa este caso como solicitud incorrecta. |
| Ruta no registrada | `404` | Devuelve un mensaje indicando el método y la URL solicitados. |
| Límite de solicitudes excedido | `429` | Se agotó el límite por IP para la ventana actual. |
| Error no controlado | `500` (por defecto) | Lo procesa el middleware central de errores. |

## Flujo de trabajo

| Paso | Componente | Qué sucede |
|---:|---|---|
| 1 | Inicio (`src/app.js`) | Express configura el análisis de cuerpos JSON y el middleware de registro de solicitudes. |
| 2 | Solicitud de bienvenida | `GET /` responde con información general. No atraviesa el limitador `/api/`. |
| 3 | Limitador general | Las solicitudes que comienzan con `/api/` quedan sujetas a un máximo de 5 solicitudes por minuto y por IP. |
| 4 | Enrutador de autos | `/api/autosdeportivos` se conecta con las operaciones CRUD. |
| 5 | Validación y límite de creación | `POST` aplica primero el límite adicional de 3 solicitudes por minuto y luego valida los datos; `PUT` valida el cuerpo. |
| 6 | Operación sobre los datos | Las rutas consultan o modifican el arreglo `autosDeportivos` en memoria. |
| 7 | Respuesta o error | La ruta devuelve el resultado; las rutas desconocidas reciben `404` y los errores capturados pasan por el manejador central. |

<div align="justify">

En resumen, el flujo es: el cliente envía una solicitud HTTP desde Insomnia, Express procesa el JSON y registra la petición, los middlewares aplicables validan la solicitud y controlan el límite, la ruta ejecuta la operación CRUD sobre el arreglo en memoria y la API devuelve una respuesta JSON.

</div>