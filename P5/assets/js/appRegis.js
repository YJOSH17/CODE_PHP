





//var regitrar =document.getElementById("addForm");
regitrar.onclick=async(event)=>{
    event.preventDefault();
    let usuario=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let us=document.getElementById("usuario").value;

    if (usuario.trim()==="" || password.trim()==="" || nombre.trim()==="" || apellido.trim()===""|| us.trim()===""){
        Swal.fire({
            title: "ERROR", 
            text:"Tienes campos vacíos",
            icon: "error"
        });
        return;
    }

    if (!validarCorreo(usuario)) {
        Swal.fire({
            title: "ERROR", 
            text:"Correo no valido",
            icon: "error"
        }); 
        return;
    }
    if (!validarPassword(password)) {
        Swal.fire({
            title: "ERROR", 
            text:"Password no valido",
            icon: "error"
        });
    }
    let datos = new FormData();
    datos.append("email", usuario);
    datos.append("pass", password);
    datos.append("nombre", nombre);
    datos.append("apellido", apellido);
    datos.append("usuario", us);
    datos.append("action", "registrar");
    
    let respuesta = await fetch("php/insertarContacto.php", { method: 'POST', body: datos });
    let json = await respuesta.json();

    if (json.success === true) {
        Swal.fire({ title: "¡REGISTRO ÉXITOSO!", text: json.mensaje, icon: "success" });
        limpiar();
    } else {
        Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
    }
}

function validarCorreo(usuario) {
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    return regex.test(usuario.trim());
}

function validarPassword(password) {
    var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return regex.test(password.trim());
}
function limpiar() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("usuario").value = "";}