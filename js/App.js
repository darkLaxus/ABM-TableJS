var acc = 0;

function addToTable() { // funcion que crea la fila
    var nombre = document.getElementById("nombre").value;
    var tbody = document.getElementById("tbody");
    var tr = document.createElement("tr");
    tr.classList.add("d-flex")
    tr.innerHTML = `
        <td id="nombre${acc}">${nombre}</td>  
        <td><button id="acc${acc}" class="btn btn-success" onclick="deleteRow(acc${acc})">Borrar</button></td>  
        <td><button id="mod${acc}" class="btn btn-warning" onclick="modifRow(nombre${acc})">Modificar</button></td>  
    `;
    acc++;
    // incrusta en el id como un hijo, el tr creado
    tbody.appendChild(tr);
    document.getElementById("nombre").value = "";

    contador();
    notificacionAdd();
}

// FUNCION QUE BORRA LA FILA POR EL ID

function deleteRow(e) { // funcion que borra la fila
    acc--;
    console.log("en el borrador");
    console.log("removimos el elemento " + e.id);
    // elimina todo el codigo, desde el que esta sube a su padre, al padre del padre y lo remueve
    document.getElementById(e.id).parentElement.parentElement.remove();
    notificacionDelete();
}


// funcion MODIFICAR DATOS DE LA TABLA  
// 1. crear el formulario donde escribiremos el nuevo dato
// 2. pasarle un unico parametro, q es el q reviciremos de la funcion
// 3. crear el addeventlistener del botton que envia los datos
// 4. dentro del 3ro, al parametro.innerHTML darle el valor del input con el nuevo dato
// 5. eliminar el formulario creado

function modifRow(e) { // Funcion para modificar el dato
    console.log("en el modificador");
    console.log(e) // accedo al dato
    console.log(e.innerHTML) // accedo al valor dentro de la etiqueta
    // 1. 2. 
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
    console.log("no modificado: " + e.innerHTML);
    // 3. 4. 5.
    document.getElementById("e-mod").addEventListener("click", function () {
        // document.getElementById(e).innerHTML= document.getElementById("d-mod").value;
        e.innerText = document.getElementById("d-mod").value;
        console.log("modificado: " + e.innerHTML)
        document.getElementById("elementMod").remove();
        console.log("dentro del addEventListener")
    });
}

// previene la accion por defecto en los eventos de envio
document.addEventListener("submit", function (e) {
    e.preventDefault();
})

function contador() {
    document.getElementById("cont").textContent = acc;
}


//  notificaciones de Add/delete

function notificacionAdd() {

    var padre = document.getElementById("alert-zone");
    console.log(padre);
    var elemento= document.createElement("div");
    elemento.className = "alert alert-success";
    elemento.id = "alerta";
    elemento.textContent = "agregado con exito!";
    padre.appendChild(elemento);

    setTimeout( function(){
        console.log(elemento);
        elemento.remove();
    }, 1000)
}

function notificacionDelete() {

    var padre = document.getElementById("alert-zone");
    console.log(padre);
    var elemento= document.createElement("div");
    elemento.className = "alert alert-danger";
    elemento.id = "alerta";
    elemento.textContent = "Eliminado con exito!";
    padre.appendChild(elemento);

    setTimeout( function(){
        console.log(elemento);
        elemento.remove();
    }, 1000)
}