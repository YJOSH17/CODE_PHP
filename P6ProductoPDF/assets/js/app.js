var btnGuardar=document.getElementById('btnGuardar');

btnGuardar.onclick= async()=>{

let nombre=document.getElementById('nombre').value;
let precio=document.getElementById('precio').value;
let cantidad=document.getElementById('cantidad').value;
let proveedor=document.getElementById('proveedor').value;
let unidadm=document.getElementById('unidadm').value;
let categoria=document.getElementById('categoria').value;

if(nombre.trim()=="" || precio.trim()=="" || cantidad.trim()=="" || proveedor.trim()=="" || unidadm.trim()=="" || categoria.trim()==""){
    Swal.fire({
        title: "CAMPOS VACIOS", 
        text:"RELLENA TODOS LOS CAMPOS",
        icon: "error"
    });
    return;
}

let datos=new FormData();
datos.append("nombre",nombre);
datos.append("precio",precio);
datos.append("cantidad",cantidad);
datos.append("proveedor",proveedor);
datos.append("unidadm",unidadm);
datos.append("categoria",categoria);

let respuesta=await fetch("php/insertarProducto.php",{method:'POST',body:datos});
let json=await respuesta.json();

if(json.success==true){
    Swal.fire({title: "¡REGRISTRO ÉXITOSO!",text: json.mensaje,icon: "success"
    });

    limpiarForm();
}else{
    Swal.fire({ title: "ERROR",text: json.mensaje,icon: "error"
    });
}
cargarProductos();
}

const cargarProductos=async()=>{
    let respuesta=await fetch("php/cargarProductos.php");
    let json=await respuesta.json();
    let tablaHTML=``
    json.data.forEach(item=>{
        tablaHTML+=`<tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>$ ${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td>${item[5]}</td>
        <td>${item[6]}</td>
        <td> <button class="btn btn-danger" onclick="eliminarProducto(${item[0]})"><i class="bi bi-trash"></i></button></td>
      <td> <button class="btn btn-info"  onclick="mostrarProducto(${item[0]})" data-bs-toggle="modal" data-bs-target="#editProducto"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg></button></td>
        </tr>
    `
    });
    document.getElementById("listaProductos").innerHTML=tablaHTML;
}



const eliminarProducto = async (id) => {
    Swal.fire({
        title: "¿ESTAS SEGURO DE ELIMINAR ESTE PRODUCTO?",
        showDenyButton: true,
        confirmButtonText: "SI!!!",
        denyButtonText: "NO"

    }).then(async (result) => {
        if (result.isConfirmed) {
            let idp = new FormData();
            idp.append('id', id);

            let respuesta = await fetch("php/eliminarProducto.php", {
                method: 'POST',
                body: idp
            });
            let json = await respuesta.json();

            if (json.success == true) {
                Swal.fire({
                    title: "¡PRODUCTO ELIMINADO!", text: json.mensaje, icon: "success"});
            } else {
                Swal.fire({
                    title: "ERROR", text: json.mensaje, icon: "error"});
            }
            cargarProductos();
            Swal.fire("Producto eliminado", "", "success");
            limpiarForm();
        }
    });
}


const mostrarProducto=async(id)=>{
    let datos=new FormData();
    datos.append("id",id);
    
    let respuesta=await fetch("php/mostrarProducto.php",{method:'POST',body:datos});
    let json=await respuesta.json();

    document.querySelector("#id").value=json.id;
    document.querySelector("#enombre").value=json.nombre;
    document.querySelector("#eprecio").value=json.precio;
    document.querySelector("#ecantidad").value=json.cantidad;
    document.querySelector("#eproveedor").value=json.proveedor;
    document.querySelector("#eunidadm").value=json.unidadm;
    document.querySelector("#ecategoria").value=json.categoria;
}


const actualizarProducto=async()=>{

    var id=document.querySelector("#id").value;
    var nombre=document.querySelector("#enombre").value;
    var precio=document.querySelector("#eprecio").value;
    var cantidad=document.querySelector("#ecantidad").value;
    var proveedor=document.querySelector("#eproveedor").value;
    var unidadm=document.querySelector("#eunidadm").value;
    var categoria=document.querySelector("#ecategoria").value;

    if(nombre.trim()=="" || precio.trim()=="" || cantidad.trim()=="" || proveedor.trim()=="" || unidadm.trim()=="" || categoria.trim()==""){
        Swal.fire({
            title: "CAMPOS VACIOS", 
            text:"RELLENA TODOS LOS CAMPOS",
            icon: "error"
        });
        return;
    }
    
  
let datos=new FormData();
datos.append("id",id);
datos.append("nombre",nombre);
datos.append("precio",precio);
datos.append("cantidad",cantidad);
datos.append("proveedor",proveedor);
datos.append("unidadm",unidadm);
datos.append("categoria",categoria);
    

    let respuesta=await fetch("php/actualizarProducto.php",{method:'POST',body:datos});
    let json=await respuesta.json();
    
    document.querySelector("#editProducto").click();
    if(json.success==true){
        Swal.fire({title: "¡ACTUALIZACIÓN ÉXITOSA!",text: json.mensaje,icon: "success"
        });
        limpiarForm();
    }else{
        Swal.fire({ title: "ERROR",text: json.mensaje,icon: "error"
        });
    }
    cargarProductos();
}

const limpiarForm=()=>{
    document.querySelector("#id").value="";
    document.querySelector("#nombre").value="";
    document.querySelector("#precio").value="";
    document.querySelector("#cantidad").value="";
    document.querySelector("#proveedor").value="";
    document.querySelector("#unidadm").value="";
    document.querySelector("#categoria").value="";
}