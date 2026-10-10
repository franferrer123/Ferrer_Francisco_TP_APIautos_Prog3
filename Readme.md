# TP - Gestion de autos

## Descripcion
Este proyecto es en una aplicacion web que integra una API externa conectada a una base de datos. Permite realizar operaciones del CRUD completas (crear, leer, actualizar y eliminar) sobre una lista de autos.

## Utilizaciones
- **Backend:** Node.js, Express.js, MongoDB, Mongoose (API Externa)
- **Frontend:** HTML5, CSS3, JavaScript
- **Pruebas:** Postman

---

## 1 — Practica y Respuestas Teoricas (Postman)

### Act 1 — Obtener todos los automoviles
- **¿Que codigo de estado HTTP devuelve la API?** Devuelve un código `200 OK`.
- **¿Que estructura tiene la respuesta?** Un Array de objetos estructurado en formato JSON.
- **¿Cuantos automoviles devuelve?** Devuelve la lista de autos completa almacenada en la base de datos.
- **¿Que atributos tiene cada automovil?** Cada auto tiene los campos: `_id` (el id real de MongoDB), `id` (id que le damos), `marca`, `precio` y `color` (en formato #).

### Act 2 — Obtener un automovil por ID
- **ID existente** Devuelve `200 OK` junto con el auto especificado por id de forma individual.
- **ID inexistente** Devuelve `404 Not Found` con un mensaje de error en formato JSON indicando que el auto no fue encontrado.

### Act 3 — Agregar un automovil de forma manual
- **ID Manual:** Al enviar un ID que ya esta definido, la API retorna `201 Created` y el objeto es persistido. Al consultar el GET general, este registro se ve correctamente al final de la coleccion.

### Act 4 - Agregar un automovil de forma automatica
- **ID Automatico:** Si skipeamos el campo `id`, la API calcula de forma automatica el nuevo id sumando 1 al valor maximo que existe en la base de datos.
- Si se inserta manualmente un ID muy elevado, los siguientes IDs automaticos continuan la secuencia a partir de ese valor maximo que se ingresa.

### Act 5 — Intentar insertar un ID existente
- **Codigo HTTP:** Devuelve un error `400 Bad Request`.
- **Mensaje devuelto:** Un mensaje de error indicando que el ID especificado ya esta registrado en el sistema.
- **Motivo:** El `id` funciona como una clave unica en la base de datos para la aplicacion, por lo que el backend restringe que se duplique para garantizar la identidad relacional de los datos.

### Act 6 — Modificar
- **Modificar (PUT):** Devuelve `200 OK` con el auto modificado si el ID existe en el sistema. Si el ID no existe, responde con error `404 Not Found`.

### Act 7 - Eliminar
- **Eliminar (DELETE):** Remueve el registro del auto por completo de MongoDB y retorna `200 OK`. Si se intenta borrar un ID que no existe, la API responde con `404 Not Found`.

### 2 - Cliente web
 Desarrolle una interface web con varias paginas independientes conectadas a la API mediante la API Fetch de JavaScript.

### Implementaciones (tecnologias usadas)
- **Navegacion (`index.html`):** Menu en la parte superior para mover al usuario.
- **Consulta (`consulta.html`):** Renderizado de la base de datos en una tabla de HTML limpia y buscador individual de forma asincronica por ID.
- **Alta (`alta.html`):** Formulario de registro con validaciones de campos obligatorios (requisitos), prevencion de valores negativos (menores a 1) y soporte para la generacion de ID de forma automatica o manual, agrega el auto mediante el metodo POST.
- **Modificacion (`modificar.html`):** Formulario de edicion de dos pasos. Primero recupera el estado actual del auto por ID y luego procesa los cambios mediante el metodo PUT.
- **Eliminacion (`eliminar.html`):** Control de bajas de forma definitiva mediante una confirmacion previa del operador (`confirm()`) y el borrado persistente mediante el metodo DELETE.
- **Asyncronismo:** Funciones asyncronicas para que no haya errores de cargas con el HTML.
- **Bootstrap:** Estilo visual de la tabla de consulta y los botones utilizando metodos de bootstrap.
- **Estilos (`estilos.css`):** Estilo visual propio con el css tradicional para los contenedores de manipulacion. 