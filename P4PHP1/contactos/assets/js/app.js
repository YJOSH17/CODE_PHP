var btnGuardar=document.getElementById('btnGuardar');

btnGuardar.onclick= async()=>{

let nombre=document.getElementById('nombre').value;
let ap=document.getElementById('ap').value;
let am=document.getElementById('am').value;
let telefono=document.getElementById('telefono').value;

if(nombre.trim()=="" || ap.trim()=="" || am.trim()=="" || telefono.trim()==""){
    Swal.fire({
        title: "ERROR", 
        text:"Tienes campos vacíos",
        icon: "error"
    });
    return;
}

let datos=new FormData();
datos.append("nombre",nombre);
datos.append("ap",ap);
datos.append("am",am);
datos.append("telefono",telefono);
datos.append("action","add");

let respuesta=await fetch("php/metodosC.php",{method:'POST',body:datos});
let json=await respuesta.json();

if(json.success==true){
    Swal.fire({title: "¡REGRISTRO ÉXITOSO!",text: json.mensaje,icon: "success"
    });
    limpiar();
}else{
    Swal.fire({ title: "ERROR",text: json.mensaje,icon: "error"
    });
}
cargarContactos();
}


const cargarContactos=async()=>{
    const datos=new FormData();
    datos.append("action", "selectAll");
    let respuesta=await fetch("php/metodosC.php", {method:'POST',body:datos});
    let json=await respuesta.json();
    let tablaHTML=``
    json.data.forEach(item=>{
        tablaHTML+=`<tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td> <button class="btn btn-danger" onclick="eliminarContacto(${item[0]})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
      </svg> </button></td>
      <td> <button class="btn btn-info"  onclick="mostrarContacto(${item[0]})" data-bs-toggle="modal" data-bs-target="#editModal"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg></button></td>
        </tr>
    `
    });
    document.getElementById("listaContactos").innerHTML=tablaHTML;
}



const eliminarContacto = async (id) => {
    Swal.fire({
        title: "¿Estás seguro de eliminar este contacto?",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
        denyButtonText: "No estoy seguro"

    }).then(async (result) => {
        if (result.isConfirmed) {
            let contactoid = new FormData();
            contactoid.append('id', id);
            contactoid.append('action','delete');

            let respuesta = await fetch("php/metodosC.php", {
                method: 'POST',
                body: contactoid
            });
            let json = await respuesta.json();

            if (json.success == true) {
                Swal.fire({
                    title: "¡Se eliminó con éxito!", text: json.mensaje, icon: "success"});
                    limpiar();
            } else {
                Swal.fire({
                    title: "ERROR", text: json.mensaje, icon: "error"});
            }
            cargarContactos();
            Swal.fire("Contacto eliminado", "", "success");
        }
    });
}


const mostrarContacto=async(id)=>{
    let datos=new FormData();
    datos.append("id",id);
    datos.append('action','select');
    
    let respuesta=await fetch("php/metodosC.php",{method:'POST',body:datos});
    let json=await respuesta.json();

    document.querySelector("#id").value=json.id;

    document.querySelector("#enombre").value=json.nombre;
    document.querySelector("#eap").value=json.ap;
    document.querySelector("#eam").value=json.am;
    document.querySelector("#etelefono").value=json.telefono;
}


const actualizarContacto=async()=>{

    var id=document.querySelector("#id").value;
    var nombre=document.querySelector("#enombre").value;
    var ap=document.querySelector("#eap").value;
    var am=document.querySelector("#eam").value;
    var telefono=document.querySelector("#etelefono").value;

    if(nombre.trim()=="" || ap.trim()=="" || am.trim()=="" || telefono.trim()==""){
        Swal.fire({
            title: "ERROR", 
            text:"Tienes campos vacíos",
            icon: "error"
        });
        return;
    }
    
    let datos=new FormData();
    datos.append("id",id);
    datos.append("nombre",nombre);
    datos.append("ap",ap);
    datos.append("am",am);
    datos.append("telefono",telefono);
    datos.append('action','update');
    

    let respuesta=await fetch("php/metodosC.php",{method:'POST',body:datos});
    let json=await respuesta.json();
    
    document.querySelector("#editModal").click();
    if(json.success==true){
        Swal.fire({title: "¡ACTUALIZACIÓN ÉXITOSA!",text: json.mensaje,icon: "success"
        });
    }else{
        Swal.fire({ title: "ERROR",text: json.mensaje,icon: "error"
        });
    }
    cargarContactos();
}

const limpiar=()=>{
    document.querySelector("#id").value="";
    document.querySelector("#nombre").value="";
    document.querySelector("#ap").value="";
    document.querySelector("#am").value="";
    document.querySelector("#telefono").value="";
}