<?php
require_once "config.php";
$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){

    $id=$_POST['id'];
    $a=$_POST['nombre'];
    $b=$_POST['precio'];
    $c=$_POST['cantidad'];
    $d=$_POST['proveedor'];
    $e=$_POST['unidadm'];
    $f=$_POST['categoria'];

    $sql="UPDATE producto SET nombrep='$a',
    precio='$b',
    cantidad='$c',
    proveedor='$d',
    unidadm='$e',
    categoria='$f'
    WHERE id=$id";

    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="SE ACTUALIZÓ CORRECTAMENTE EL PRODUCTO";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL ACTUALIZAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL ACTUALIZAR";

}
echo json_encode($valido);
?>