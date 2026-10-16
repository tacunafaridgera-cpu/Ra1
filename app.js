// --- ESTRUCTURA DE DATOS (Simulando listas o ArrayLists) ---
let personas = [];
let negocios = [];
let idPersonaGlobal = 1;

// --- FUNCIÓN PARA REGISTRAR UNA PERSONA ---
function registrarPersona() {
    let nombre = document.getElementById('nombrePersona').value;
    let dni = document.getElementById('dniPersona').value;

    if(nombre === "" || dni === "") {
        alert("Por favor complete los campos obligatorios de la persona.");
        return;
    }

    // Objeto que representa a la entidad Persona
    let nuevaPersona = {
        id: idPersonaGlobal++,
        nombre: nombre,
        dni: dni
    };

    personas.push(nuevaPersona);

    // Limpiar inputs del formulario
    document.getElementById('nombrePersona').value = "";
    document.getElementById('dniPersona').value = "";

    // Actualizar la interfaz visual
    actualizarSelect();
    actualizarTabla();
}

// --- FUNCIÓN PARA REGISTRAR Y VINCULAR UN NEGOCIO ---
function registrarNegocio() {
    let propietarioId = document.getElementById('selectPropietario').value;
    let nombreNeg = document.getElementById('nombreNegocio').value;

    if(propietarioId === "" || nombreNeg === "") {
        alert("Debe seleccionar un propietario y escribir el nombre del negocio.");
        return;
    }

    // Objeto que representa a la entidad Negocio vinculada por ID
    let nuevoNegocio = {
        propietarioId: parseInt(propietarioId),
        nombre: nombreNeg
    };

    negocios.push(nuevoNegocio);

    // Limpiar input del negocio
    document.getElementById('nombreNegocio').value = "";
    
    // Actualizar la tabla
    actualizarTabla();
}

// --- FUNCIÓN PARA ACTUALIZAR EL SELECT DE PROPIETARIOS ---
function actualizarSelect() {
    let select = document.getElementById('selectPropietario');
    select.innerHTML = '<option value="">-- Seleccione Propietario --</option>';
    
    for(let i = 0; i < personas.length; i++) {
        select.innerHTML += '<option value="' + personas[i].id + '">' + personas[i].nombre + '</option>';
    }
}

// --- FUNCIÓN PARA RENDERIZAR LA TABLA DINÁMICAMENTE ---
function actualizarTabla() {
    let tbody = document.getElementById('cuerpoTabla');
    tbody.innerHTML = "";

    if(personas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" align="center">No hay registros aún</td></tr>';
        return;
    }

    for(let i = 0; i < personas.length; i++) {
        let p = personas[i];
        
        // Buscar los negocios que pertenecen a esta persona específica
        let misNegocios = "";
        for(let j = 0; j < negocios.length; j++) {
            if(negocios[j].propietarioId === p.id) {
                misNegocios += "- " + negocios[j].nombre + "<br>";
            }
        }
        
        if(misNegocios === "") {
            misNegocios = "Sin negocios registrados";
        }

        // Construir las filas de la tabla
        tbody.innerHTML += '<tr>' +
            '<td>' + p.id + '</td>' +
            '<td>' + p.nombre + '</td>' +
            '<td>' + p.dni + '</td>' +
            '<td>' + misNegocios + '</td>' +
        '</tr>';
    }
}