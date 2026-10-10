const URL = "https://api-autos-tgwd.onrender.com/autos";
window.addEventListener("DOMContentLoaded",async () => {
    obtenerAutos();
    const formBusqueda = document.querySelector("#formularioBusqueda");
    formBusqueda.addEventListener("submit", buscarAutoIndividual);
});

// Obtener todos los autos y renderizar la tabla
async function obtenerAutos() {
    try {
        const respuesta = await fetch(URL)
            if (!respuesta.ok) {
                throw new Error("Error al obtener el listado.");
        }
        const autos = await respuesta.json();
            renderizarTabla(autos);
        }
        catch(error) {
            mostrarFeedback(error.message, "error");
        }
}

// Crear e inyectar la tabla de forma dinamica con bootstrap
function renderizarTabla(autos) {
    const contenedor = document.querySelector("#contenedortabla");
    contenedor.innerHTML = "";
    if (autos.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; padding:20px;'>No hay autos registrados.</p>";
        return;
    }
    // Creo el elemento tabla y le asigno las clases de bootstrap
    const tabla = document.createElement("table");
    tabla.className = "table table-dark table-hover align-middle m-0";
    // estructura base
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Color</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = tabla.querySelector("tbody");
    // Recorre los autos e inyecta las filas directamente con template literals
    autos.forEach(auto => {
        const filaHtml = `
            <tr>
                <td style="font-weight: bold; color: #3b82f6;">${auto.id}</td>
                <td>${auto.marca}</td>
                <td>$ ${auto.precio}</td>
                <td>
                    <input type="color" 
                           value="${auto.color || '#000000'}" 
                           disabled 
                           style="width: 40px; height: 25px; border: none; background: none;">
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", filaHtml);
    });
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
}

// Buscar un auto individualmente por su ID asignado
async function buscarAutoIndividual(evento) {
    evento.preventDefault();
    const idBuscar = document.querySelector("#buscarId").value;
    try { 
        const respuesta = await fetch(`${URL}/${idBuscar}`)
            if (respuesta.status === 404) {
                throw new Error(`No existe un automovil con el ID ${idBuscar}.`);
            }    
            if (!respuesta.ok){ 
                throw new Error("Error en la busqueda.");
            }
            const auto = await respuesta.json();
            // Si lo encuentra, pasamos el objeto dentro de un array para reutilizar el renderizador
            renderizarTabla([auto]);
            mostrarFeedback(`Automovil ID ${idBuscar} encontrado.`, "exito");
        }
        catch(error){
            mostrarFeedback(error.message, "error");
        };
}

// Mostrar exito o error
function mostrarFeedback(mensaje, tipo) { 
    const elementoFeedback = document.querySelector("#mensajeAPI");
    elementoFeedback.innerText = mensaje;
    elementoFeedback.className = `mensaje mensaje-${tipo}`;
    elementoFeedback.style.display = "block";
}