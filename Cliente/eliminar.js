const URL = "https://api-autos-tgwd.onrender.com/autos";
window.addEventListener("DOMContentLoaded",async () => {
    document.querySelector("#formularioEliminar").addEventListener("submit", borrarVehiculo);
});

async function borrarVehiculo(evento) {
    evento.preventDefault();
    const idEliminar = document.querySelector("#idEliminar").value;
    // Verificacion de la existencia del auto para que se eviten falsos positivos
    try { 
        const respuesta = await fetch(`${URL}/${idEliminar}`)
        if (respuesta.status === 404) throw new Error(`No existe un automovil con el ID ${idEliminar}.`);
        if (!respuesta.ok) throw new Error("Error de comunicacion.");
        await respuesta.json();
            // Si existe, le pedimos confirmacion al usuario
        const confirma = confirm(`¿Estas seguro que desea eliminar de forma permanente el auto con ID ${idEliminar}?`);
        if (!confirma) {
            throw new Error("Operacion cancelada por el usuario");
        } 
        const respuestaDelete = await fetch(`${URL}/${idEliminar}`, {
                method: "DELETE"
        });
            if (respuestaDelete && respuestaDelete.ok) {
                mostrarFeedback("Automovil eliminado correctamente.", "exito");
                document.querySelector("#formularioEliminar").reset();
            }
    }
    catch(error) {
        // Indico si fue una cancelacion manual o un error de ID inexistente de la API
        if (error.message === "Operacion cancelada por el usuario.") {
            mostrarFeedback(error.message, "exito");
        } 
        else {
            mostrarFeedback(error.message, "error");
        }
    }
}

// Mostrar exito o error
function mostrarFeedback(mensaje, tipo) { 
    const elementoFeedback = document.querySelector("#mensajeAPI");
    elementoFeedback.innerText = mensaje;
    elementoFeedback.className = `mensaje mensaje-${tipo}`;
    elementoFeedback.style.display = "block";
}
