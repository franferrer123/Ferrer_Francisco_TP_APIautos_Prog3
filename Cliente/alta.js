const URL = "https://api-autos-tgwd.onrender.com/autos";
window.addEventListener("DOMContentLoaded",async () => {
    const formAlta = document.querySelector("#formularioAlta");
    formAlta.addEventListener("submit", registrarAuto);
});

async function registrarAuto(evento) {
    evento.preventDefault();
    const inputId = document.querySelector("#idAuto").value.trim();
    const inputMarca = document.querySelector("#autoMarca").value.trim();
    const inputPrecio = document.querySelector("#autoPrecio").value;
    const inputColor = document.querySelector("#autoColor").value;
    // Construccion del objeto (auto) para enviar a la API
    const nuevoAuto = {
        marca: inputMarca,
        precio: Number(inputPrecio),
        color: inputColor
    }; 
    // Si se completa el ID manual, lo agregamos validando que sea positivo
    if (inputId !== "") {
        const idNumerico = Number(inputId);
        if (idNumerico <= 0) {
            mostrarFeedback("El ID debe ser un numero mayor a cero.", "error");
            return;
        }
        nuevoAuto.id = idNumerico;
    }
    // Peticion POST a la API 
    try{
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoAuto)
        });
        if (respuesta.status === 400 || respuesta.status === 409) {
            throw new Error("Ya existe un automovil con ese ID.");
        }
        if (!respuesta.ok) {
            throw new Error("Error al intentar registrar el automovil.");
        }
        const datos = await respuesta.json();
        mostrarFeedback(`Automovil agregado correctamente con ID: ${datos.id}.`, "exito");
        document.querySelector("#formularioAlta").reset();
    }
    catch(error){
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
