<?php
require_once "config.php";
header('Content-Type: text/html; charset=utf-8');

$valido['success']=array('success'=>false,
'mensaje'=>"",
'id'=>"",
'nombre'=>"",
'ap'=>"",
'am'=>"",
'telefono'=>"");

if($_POST){
    $id=$_POST['id'];
    $sql="SELECT * FROM contacto WHERE id=$id";

    $res=$cx->query($sql);
    $row=$res->fetch_array();
    
    $valido['success']==true;
    $valido['mensaje']="SE ENCONTRÓ CONTACTO";

    $valido['id']=$row[0];
    $valido['nombre']=$row[1];
    $valido['ap']=$row[2];
    $valido['am']=$row[3];
    $valido['telefono']=$row[4];

}else{
    $valido['success']==false;
    $valido['mensaje']="ERROR AL ENCONTRAR CONTACTO";
}

echo json_encode($valido);

?>