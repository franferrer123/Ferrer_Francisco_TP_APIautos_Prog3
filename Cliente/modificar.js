const URL = "https://api-autos-tgwd.onrender.com/autos";
window.addEventListener("DOMContentLoaded",async () => {
    document.querySelector("#formularioBuscarModificar").addEventListener("submit", obtenerAutoParaEditar);
    document.querySelector("#formularioEdicion").addEventListener("submit", confirmarModificacion);
});

// Buscar los datos actuales del auto
async function obtenerAutoParaEditar(evento) {
    evento.preventDefault();
    const idModificar = document.querySelector("#idModificar").value;
    const formEdicion = document.querySelector("#formularioEdicion");
    try { 
        const respuesta = await fetch(`${URL}/${idModificar}`)
            if (respuesta.status === 404) {
                throw new Error(`No existe un automovil con el ID ${idModificar}.`);
            }
            if (!respuesta.ok) {
                throw new Error("Error al consultar el ID.");
            }
            const auto = await respuesta.json();
            // Relleno el formulario oculto con los datos de la API
            document.querySelector("#editId").value = auto.id;
            document.querySelector("#editMarca").value = auto.marca;
            document.querySelector("#editPrecio").value = auto.precio;
            document.querySelector("#editColor").value = auto.color || "#ffffff";
            // Mostrar el formulario de edicion en pantalla
            formEdicion.style.display = "block";
            mostrarFeedback(" Datos cargados. Avance con las modificaciones.", "exito");
        }
        catch(error) {
            formEdicion.style.display = "none";
            mostrarFeedback(error.message, "error");
        };
}

// Enviar los datos que se cambiaron a la API con PUT
async function confirmarModificacion(evento) {
    evento.preventDefault();
    const idEditar = document.querySelector("#editId").value;
    const marcaEditada = document.querySelector("#editMarca").value.trim();
    const precioEditado = document.querySelector("#editPrecio").value;
    const colorEditado = document.querySelector("#editColor").value;
    const autoActualizado = {
        marca: marcaEditada,
        precio: Number(precioEditado),
        color: colorEditado
    };
    try { 
        const respuesta = await fetch(`${URL}/${idEditar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(autoActualizado)
        })
        if (!respuesta.ok) throw new Error("Error al intentar actualizar los datos.");
        await respuesta.json();
        mostrarFeedback(" Automovil modificado correctamente.", "exito");
        document.querySelector("#formularioEdicion").reset();
        document.querySelector("#formularioEdicion").style.display = "none";
        document.querySelector("#formularioBuscarModificar").reset();
    }
    catch(error) {
        mostrarFeedback(error.message, "error");
    }
}

// Mostrar exito o error
function mostrarFeedback(mensaje, tipo) { 
    const elementoFeedback = document.querySelector("#mensajeAPI");
    elementoFeedback.innerText = mensaje;
    elementoFeedback.className = `mensaje mensaje-${tipo}`;
    elementoFeedback.style.display = "block";
}
