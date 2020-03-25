// variables 
var nombre = document.getElementById('nombre');
const tbody = document.getElementById('tbody');
const enviarBtn = document.getElementById('enviarBtn');
const formulario = document.getElementById('formulario');
const formularioMod = document.getElementById('e-mod');

// event Listener

EventListener();

// Funciones

function EventListener() {
    // agregar datos al LS y la visual
    enviarBtn.addEventListener('click', enviarNombre);

    // borrar datos del LS y la visual
    tbody.addEventListener('click', eliminarNombre);

    // modificar datos del LS y la visual
    tbody.addEventListener('click', modificarNombre);

    // cargar datos al DOM
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//  --------------------------------------------------------------

// enviar datos desde el formulario
function enviarNombre(e) {
    e.preventDefault();
    let nombreDato = nombre.value;
    const tr = document.createElement('tr');
    tr.classList.add('d-flex');
    tr.innerHTML = `
        <td>${nombreDato}</td>  
        <td><button class="btn btn-danger form-control" >Borrar</button></td>  
        <td><button class="btn btn-warning form-control" >Modificar</button></td>  
    `;
    tbody.appendChild(tr);

    agregarNombreLS(nombreDato);
    formulario.reset();
}

// agregar los datos al localstorage
function agregarNombreLS(nombre) {

    let nombres = obtenerLS();
    nombres.push(nombre)
    localStorage.setItem('nombres', JSON.stringify(nombres))
}

//  --------------------------------------------------------------

// funcion que elimina datos del dom
function eliminarNombre(e) {
    e.preventDefault();
    // console.log(e.target.parentElement.parentElement.children[0].innerText)
    if (e.target.classList.contains('btn-danger')) {
        e.target.parentElement.parentElement.remove();
        var dato = e.target.parentElement.parentElement.children[0].innerText;
        eliminarNombreLS(dato);
    }
}

// eliminar dato del localstorage
function eliminarNombreLS(nombreElegido) {
    let nombres = obtenerLS();

    nombres.map((nombre, i) => {
        if (nombre === nombreElegido) {
            nombres.splice(i, 1);
        }
    })
    localStorage.setItem('nombres', JSON.stringify(nombres))
}

//  --------------------------------------------------------------

// modificar nombre
function modificarNombre(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-warning')) {
        var mod = document.getElementById("modificador");
        mod.innerHTML = `
        <form id="elementMod">
            <h5 class="text-center text-white">dato a modificar</h5>
            <div class="form-group">
                <input type="text" id="d-mod" class="form-control">
            </div>
            <div class="form-group">
                <button id="e-mod" class="btn btn-warning form-control">Enviar Modificacion</button>
            </div>
        </form>
        `;
        var nombreAnterior = e.target.parentElement.parentElement.children[0].innerText;
        console.log("nombre anterior: " + nombreAnterior)
        modificarNombreLS(nombreAnterior);
    }
}

function modificarNombreLS(nombreAnterior){
    let nombres = obtenerLS();
    document.getElementById('e-mod').addEventListener('click', function () {
        
        var dMod = document.getElementById('d-mod').value;
        console.log("nombre nuevo: "+dMod)
        nombres.map((nombre,i) => {
            if(nombre === nombreAnterior) {
                nombres.splice(i,1,dMod);
            }
        })
        localStorage.setItem('nombres', JSON.stringify(nombres));
        console.log(nombres)
        document.getElementById("elementMod").remove();
        location.reload(true);
    })
}



//  --------------------------------------------------------------

// obtener datos del local storage
function obtenerLS() {
    let nombres;
    if (localStorage.getItem("nombres") === null) {
        nombres = [];
    } else {
        nombres = JSON.parse(localStorage.getItem('nombres'))
    }
    return nombres;
}


// local storage listo para cargar
function localStorageListo() {
    let nombres = obtenerLS();

    nombres.map((nombre) => {
        const tr = document.createElement('tr');
        tr.classList.add('d-flex');
        tr.innerHTML = `
            <td>${nombre}</td>  
            <td><button class="btn btn-danger form-control" >Borrar</button></td>  
            <td><button class="btn btn-warning form-control" >Modificar</button></td>  
        `;
        tbody.appendChild(tr);
    })
}