<?php
require_once "config.php";
header('Content-Type: text/html; charset=utf-8');

$valido['success']=array('success'=>false,
'mensaje'=>"",
'id'=>"",
'nombrep'=>"",
'precio'=>"",
'cantidad'=>"",
'proveedor'=>"",
'unidadm'=>"",
'categoria'=>"");

if($_POST){
    $id=$_POST['id'];
    $sql="SELECT * FROM producto WHERE id=$id";

    $res=$cx->query($sql);
    $row=$res->fetch_array();
    
    $valido['success']==true;
    $valido['mensaje']="SE ENCONTRÓ PRODUCTO";

    $valido['id']=$row[0];
    $valido['nombre']=$row[1];
    $valido['precio']=$row[2];
    $valido['cantidad']=$row[3];
    $valido['proveedor']=$row[4];
    $valido['unidadm']=$row[5];
    $valido['categoria']=$row[6];

}else{
    $valido['success']==false;
    $valido['mensaje']="ERROR AL ENCONTRAR PRODUCTO";
}

echo json_encode($valido);

?>