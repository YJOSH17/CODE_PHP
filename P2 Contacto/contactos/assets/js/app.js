var btnGuardar=document.getElementById('btnGuardar');

btnGuardar.onclick= async()=>{
    //Recopilar datos
let nombre=document.getElementById('nombre').value;
let ap=document.getElementById('ap').value;
let am=document.getElementById('am').value;
let telefono=document.getElementById('telefono').value;

//Validar campos vacíos
if(nombre.trim()=="" || ap.trim()=="" || am.trim()=="" || telefono.trim()==""){
    Swal.fire({
        title: "ERROR", 
        text:"Tienes campos vacíos",
        icon: "error"
    });
    return;
}

//ENCAPSULAR DATOS
let datos=new FormData();
datos.append("nombre",nombre);
datos.append("ap",ap);
datos.append("am",am);
datos.append("telefono",telefono);

//PETICION Y RESPUESTA
let respuesta=await fetch("php/insertarContacto.php",{method:'POST',body:datos});
let json=await respuesta.json();

if(json.success==true){
    Swal.fire({title: "¡REGRISTRO ÉXITOSO!",text: json.mensaje,icon: "success"
    });
}else{
    Swal.fire({ title: "ERROR",text: json.mensaje,icon: "error"
    });
}
cargarContactos();
}

const cargarContactos=async()=>{
    let respuesta=await fetch("php/cargarContactos.php");
    let json=await respuesta.json();
    let tablaHTML=``
    json.data.forEach(item=>{
        tablaHTML+=`<tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td> <button class="btn btn-danger" onclick="eliminarContacto(${item[0]})"><i class="bi bi-trash"></i></button></td>
      <td> <button class="btn btn-info"  onclick="mostrarContacto(${item[0]})" data-bs-toggle="modal" data-bs-target="#editModal"><i class="bi bi-person-fill-gear"></i></button></td>
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

            let respuesta = await fetch("php/eliminarContacto.php", {
                method: 'POST',
                body: contactoid
            });
            let json = await respuesta.json();

            if (json.success == true) {
                Swal.fire({
                    title: "¡Se eliminó con éxito!", text: json.mensaje, icon: "success"});
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
    
    let respuesta=await fetch("php/mostrarContacto.php",{method:'POST',body:datos});
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
            title: "CAMPOS VACIOS", 
            text:"TRELLENA TODOS LOS CAMPOS",
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
    

    let respuesta=await fetch("php/actualizarContacto.php",{method:'POST',body:datos});
    let json=await respuesta.json();
    
    document.querySelector("#editModal").click();
    if(json.success==true){
        Swal.fire({title: "¡ACTUALIZACIÓN ÉXITOSA!",text: json.mensaje,icon: "success"
        });
    }else{
        Swal.fire({ title: "ERROR AL ACTUALIZAR",text: json.mensaje,icon: "error"
        });
    }
    cargarContactos();
}