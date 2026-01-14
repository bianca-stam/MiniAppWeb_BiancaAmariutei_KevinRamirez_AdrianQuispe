var formulario = document.getElementById("formulario");
var bandera = true;

//inputs de texto
var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var dni = document.getElementById("dni");
var telefono = document.getElementById("telefono");
var email = document.getElementById("email");
var numEntradas = document.getElementById("numEntradas");

//input de numero
var tipoEntrada = document.getElementById("tipoEntrada");

//checkboxes
var bebida = document.getElementById("bebida");
var comida = document.getElementById("comida");
var brazalete = document.getElementById("brazalete");

var tyc = document.getElementById("tyc");

//textarea
var comentario = document.getElementById("comentario");

//botones
var previsualizarBtn = document.getElementById("previsualizar");
var btnEnviar = document.getElementById("enviar");
var btnLimpiar = document.getElementById("limpiar");
var btnRecuperarLS = document.getElementById("recuperarLS");
var btnRecargar = document.getElementById("recargar");

//elemento del DOM donde se mostrará la previsualización
var previsualizacionDiv = document.getElementById("previsualizacion");

//mensajes de error
var msgNombre = document.getElementById("msgNombre");
var msgApellido = document.getElementById("msgApellido");
var msgDni = document.getElementById("msgDni");
var msgTelefono = document.getElementById("msgTelefono");
var msgEmail = document.getElementById("msgEmail");
var msgNumEntradas = document.getElementById("msgNumEntradas");
var msgTipoEntrada = document.getElementById("msgTipoEntrada");
var msgAdicionales = document.getElementById("msgAdicionales");
var msgComentario = document.getElementById("msgComentario");
var msgTyc = document.getElementById("msgTyc");

//Agregar event listeners a los inputs para validación en tiempo real
nombre.addEventListener("input", validarNombre);
apellido.addEventListener("input", validarApellido);
dni.addEventListener("input", validarDni);
telefono.addEventListener("input", validarTelefono);
email.addEventListener("input", validarEmail);
numEntradas.addEventListener("input", validarNumEntradas);
tipoEntrada.addEventListener("change", validarTipoEntrada);
tyc.addEventListener("change", validarTyc);

//Agregar event listeners a los botones
previsualizarBtn.addEventListener("click", previsualizar);

formulario.addEventListener("submit", (event) => {
    var listaInvalidos = validarTodos();
    if (listaInvalidos.length > 0) {
        event.preventDefault(); 
        alert("No se puede enviar el formulario. Los siguientes campos son inválidos: \n - " + listaInvalidos.join("\n - "));
    } else{
        const datosFormulario = {
            nombre: nombre.value,
            apellido: apellido.value,
            dni: dni.value,
            telefono: telefono.value,
            email: email.value,
            entradas: numEntradas.value,
            tipo: tipoEntrada.value,
            adicionales: {
                bebida: bebida.checked,
                comida: comida.checked,
                brazalete: brazalete.checked
            },
            comentario: comentario.value
        };

        localStorage.setItem("formulario", JSON.stringify(datosFormulario));
    }
});
btnLimpiar.addEventListener("click", limpiarFormulario);
btnRecuperarLS.addEventListener("click", recuperarDelLocalStorage);
btnRecargar.addEventListener("click", recargarPagina);

//Funciones de los botones
function previsualizar(event) {
    //Lógica para previsualizar los datos del formulario
    if (bandera) {
        previsualizarBtn.textContent = "Quitar Previsualización";
        var div = document.createElement("div");
        div.id = "datosPrevisualizados";

        var titulo = document.createElement("h2");
        titulo.textContent = "Previsualización de Datos";

        var contenido = document.createElement("p");
        contenido.innerHTML = `
            <strong>Nombre:</strong> ${nombre.value} <br>
            <strong>Apellido:</strong> ${apellido.value} <br>
            <strong>DNI:</strong> ${dni.value} <br>
            <strong>Teléfono:</strong> ${telefono.value} <br>
            <strong>Email:</strong> ${email.value} <br>
            <strong>Número de Entradas:</strong> ${numEntradas.value} <br>
            <strong>Tipo de Entrada:</strong> ${tipoEntrada.value} <br>
            <strong>Adicionales:</strong> 
                ${bebida.checked ? "Bebida " : ""} 
                ${comida.checked ? "Comida " : ""} 
                ${brazalete.checked ? "Brazalete " : ""} <br>
            <strong>Comentario:</strong> ${comentario.value} <br>
        `;

        div.appendChild(titulo);
        div.appendChild(contenido);
        
        previsualizacionDiv.innerHTML = "";
        previsualizacionDiv.appendChild(div);
        bandera = false;
    } else {
        previsualizarBtn.textContent = "Previsualizar";
        previsualizacionDiv.innerHTML = "";
        bandera = true;
    }

}

function recuperarDelLocalStorage(event) {
    const datosGuardados = localStorage.getItem("formulario");
    if (datosGuardados) {
        const datosFormulario = JSON.parse(datosGuardados);

        nombre.value = datosFormulario.nombre;
        apellido.value = datosFormulario.apellido;
        dni.value = datosFormulario.dni;
        telefono.value = datosFormulario.telefono;
        email.value = datosFormulario.email;
        numEntradas.value = datosFormulario.entradas;
        tipoEntrada.value = datosFormulario.tipo;
        bebida.checked = datosFormulario.adicionales.bebida;
        comida.checked = datosFormulario.adicionales.comida;
        brazalete.checked = datosFormulario.adicionales.brazalete;
        comentario.value = datosFormulario.comentario;
    } else {
        alert("No hay datos guardados en localStorage");
    }
}

function limpiarFormulario(event) {
    nombre.value = "";
    apellido.value = "";
    dni.value = "";
    telefono.value = "";
    email.value = "";
    numEntradas.value = "";
    tipoEntrada.value = "";
    bebida.checked = false;
    comida.checked = false;
    brazalete.checked = false;
    comentario.value = "";
    tyc.checked = false;

    msgNombre.textContent = "";
    msgApellido.textContent = "";
    msgDni.textContent = "";
    msgTelefono.textContent = "";
    msgEmail.textContent = "";
    msgNumEntradas.textContent = "";
    msgTipoEntrada.textContent = "";
    msgAdicionales.textContent = "";
    msgComentario.textContent = "";
    msgTyc.textContent = "";

    previsualizacionDiv.innerHTML = "";
}

function recargarPagina(event) {
    location.reload();
}

//Funciones de validación
function validarNombre() {
    //Lógica para validar el nombre
    if (nombre.value.length < 2) {
        nombre.style.borderColor = "red";
        msgNombre.classList.replace("valido", "invalido");
        msgNombre.textContent = "El nombre debe tener al menos 2 caracteres";
        return false;
    } else {
        nombre.style.borderColor = "green";
        msgNombre.classList.replace("invalido", "valido");
        msgNombre.textContent = "Nombre válido";
        return true;
    }
}

function validarApellido() {
    //Lógica para validar el apellido
    if (apellido.value.length < 2) {
        apellido.style.borderColor = "red";
        msgApellido.classList.replace("valido", "invalido");
        msgApellido.textContent = "El apellido debe tener al menos 2 caracteres";
        return false;
    } else {
        apellido.style.borderColor = "green";
        msgApellido.classList.replace("invalido", "valido");
        msgApellido.textContent = "Apellido válido";
        return true;
    }
}

function validarDni() {
    //Lógica para validar el DNI
    const regexDNI = /^[0-9]{8}[A-Za-z]$/;

    if (!regexDNI.test(dni.value)) {
        dni.style.borderColor = "red";
        msgDni.classList.replace("valido", "invalido"); 
        msgDni.textContent = "El DNI no es válido";
        return false;
    } else {
        dni.style.borderColor = "green";
        msgDni.classList.replace("invalido", "valido");
        msgDni.textContent = "DNI válido";
        return true;
    }

    /*La expresion regular y el metodo para validarla (.test) fueron implementados con ayuda de la IA */
}

function validarTelefono() {
    //Lógica para validar el teléfono
    if (telefono.length != 9 && isNaN(telefono.value)) {
        telefono.style.borderColor = "red";
        msgTelefono.classList.replace("valido", "invalido");
        msgTelefono.textContent = "El teléfono es inválido";
        return false;   
    } else {
        telefono.style.borderColor = "green";
        msgTelefono.classList.replace("invalido", "valido");
        msgTelefono.textContent = "Teléfono válido";
        return true;
    }
}

function validarEmail() {
    //Lógica para validar el email
    if (!email.value.includes("@") || !email.value.includes(".") || email.value.includes(" ") || email.value.indexOf("@") > email.value.lastIndexOf(".")) {
        email.style.borderColor = "red";
        msgEmail.classList.replace("valido", "invalido");
        msgEmail.textContent = "El email es inválido";
        return false;
    } else {
        email.style.borderColor = "green";
        msgEmail.classList.replace("invalido", "valido");
        msgEmail.textContent = "Email válido";
        return true;
    }
}

function validarNumEntradas() {
    //Lógica para validar el número de entradas
    if ( numEntradas.value < 1 || numEntradas.value > 5) {
        numEntradas.style.borderColor = "red";
        msgNumEntradas.classList.replace("valido", "invalido");
        msgNumEntradas.textContent = "El número de entradas debe estar entre 1 y 5";
        return false;
    } else if (isNaN(numEntradas.value)) {
        numEntradas.style.borderColor = "red";
        msgNumEntradas.classList.replace("valido", "invalido");
        msgNumEntradas.textContent = "El número de entradas debe ser un número";
        return false;
    } else {
        msgNumEntradas.textContent = "";
        return true;
    }
}

function validarTipoEntrada() {
    //Lógica para validar el tipo de entrada
    if (tipoEntrada.value === "") {
        tipoEntrada.style.borderColor = "red";
        msgTipoEntrada.classList.replace("valido", "invalido");
        msgTipoEntrada.textContent = "Debe seleccionar un tipo de entrada";
        return false;
    } else {
        tipoEntrada.style.borderColor = "green";
        msgTipoEntrada.classList.replace("invalido", "valido");
        msgTipoEntrada.textContent = "";
        return true;
    }
}

function validarTyc() {
    //Lógica para validar los términos y condiciones
    if (!tyc.checked) {
        msgTyc.classList.replace("valido", "invalido");
        msgTyc.textContent = "Debe aceptar los términos y condiciones";
        return false;
    } else {
        msgTyc.classList.replace("invalido", "valido");
        msgTyc.textContent = "";
        return true;
    }
}

function validarTodos() {
    //Lógica para validar todos los campos

    var listaInvalidos = [];

    var vNombre = validarNombre();
    var vApellido = validarApellido();
    var vDni = validarDni();
    var vTelefono = validarTelefono();
    var vEmail = validarEmail();
    var vNumEntradas = validarNumEntradas();
    var vTipoEntrada = validarTipoEntrada();
    var vTyc = validarTyc();

    if (!vNombre) listaInvalidos.push("Nombre");
    if (!vApellido) listaInvalidos.push("Apellido");
    if (!vDni) listaInvalidos.push("DNI");
    if (!vTelefono) listaInvalidos.push("Teléfono");
    if (!vEmail) listaInvalidos.push("Email");
    if (!vNumEntradas) listaInvalidos.push("Número de Entradas");
    if (!vTipoEntrada) listaInvalidos.push("Tipo de Entrada");
    if (!vTyc) listaInvalidos.push("Términos y Condiciones");

    return listaInvalidos;
}