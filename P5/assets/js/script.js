var sesion=localStorage.getItem('usuario') || "null";

if(sesion!="null")
    window.location.href="index.html"


function validarCorreo (correo) {
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    return regex.test(correo.trim());
}

function validarPassword (password) {
    var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return regex.test(password.trim());
}

const login=async() => {
    let usuarioL=document.getElementById('txt-input').value;
    let passwordL=document.getElementById("pwd").value; 
if(usuarioL.trim()==""||passwordL==""){
    Swal.fire({title: "ERROR", text: "CAMPOS VACIOS", icon: "error" }); 
return;
}   

if(!validarCorreo (usuarioL)) {
    Swal.fire({title: "ERROR", text: "CORREO NO VALIDO", icon: "error" }); 
    return;
    }
if(!validarPassword (passwordL)) {    
    Swal.fire({title: "ERROR", text: "PASSWORD NO VALIDO", icon: "error" }); 
    return;
    }
    
    datos=new FormData();
    datos.append("email", usuarioL);
    datos.append("password", passwordL);    
    datos.append("action", "login");
    
    let respuesta=await fetch("php/loginUsuario.php", {method: 'POST', body:datos});
    let json=await respuesta.json();    
    if(json.success==true) {    
    localStorage.setItem("usuario", usuarioL);
    window.location.href="Datos.html"
    }else{
        Swal.fire({title: "ERROR", text: json.mensaje, icon: "error"});    
    }
}



const Registrar=async() => {
    let usuario=document.getElementById('email').value; 
    let password=document.getElementById("password").value;
    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let us=document.getElementById("usuario").value;

    
    if(usuario.trim()==""||password==""||nombre==""||apellido==""||us.trim()===""){
        Swal.fire({title: "ERROR", text: "CAMPOS VACIOS", icon: "error" });
        return;    
    }
    
    if(!validarCorreo (usuario)){
        Swal.fire({title: "ERROR", text: "CORREO NO VALIDO", icon: "error" });
        return;
    }    
    if(!validarPassword (password)) {    
        Swal.fire({title: "ERROR", text: "PASSWORD NO VALIDO", icon: "error" }); 
        return;
    }
    datos=new FormData();   
    datos.append("email", usuario); 
    datos.append("password", password);   
    datos.append("nombre", nombre);    
    datos.append("apellido", apellido);
    datos.append("usuario", us);    
    datos.append("action", "registrar");
    
    let respuesta=await fetch("php/loginUsuario.php", {method: 'POST', body: datos}); 
    let json=await respuesta.json();
    if(json.success==true) {
        Swal.fire({title: "EXITO!!!", text: json.mensaje, icon: "success"});
        usuario.value=""
        password.value=""
        nombre.value=""
        apellido.value=""
        us.value=""
        window.location.href="index.html"

    }else{
        Swal.fire({title: "ERROR", text: json.mensaje, icon: "error"});
    }
}

//var regitrar =document.getElementById("addForm");
/*regitrar.onclick=async(event)=>{
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
    document.getElementById("usuario").value = "";}*/