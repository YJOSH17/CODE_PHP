var sesion=localStorage.getItem('usuario') || "null";

if (sesion=="null") {
    window.location.href="index.html"
}

const cargarNombre=async()=>{

        datos=new FormData();
        datos.append("usuario", sesion);
        datos.append("action", "select");

    let respuesta=await fetch("php/loginUsuario.php", {method: 'POST', body: datos});
    let json=await respuesta.json();
    if (json.success==true) {
        document.getElementById("user").innerHTML=json.mensaje;
    }else{
        Swal.fire({title: "ERROR", text: json.mensaje, icon: "error"});
    }
}

document.getElementById("btnSalir").onclick=()=>{
    Swal.fire({
        title: "Esta seguro de Cerrar Sesión?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
        }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.href="index.html"
        }
    });
}

