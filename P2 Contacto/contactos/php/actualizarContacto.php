<?php
require_once "config.php";
$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){

    $id=$_POST['id'];
    $a=$_POST['nombre'];
    $b=$_POST['ap'];
    $c=$_POST['am'];
    $d=$_POST['telefono'];

    $sql="UPDATE contacto SET nombre='$a',
    ap='$b',
    am='$c',
    telefono='$d'
    WHERE id=$id";
error_log("ID: $id, Nombre: $a, AP: $b, AM: $c, Telefono: $d");
error_log($sql);
    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="CONTACTO ACTUALIZADO CORRECTAMENTE";
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