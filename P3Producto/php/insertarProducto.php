<?php
require_once "config.php";
$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $a=$_POST['nombre'];
    $b=$_POST['precio'];
    $c=$_POST['cantidad'];
    $d=$_POST['proveedor'];
    $e=$_POST['unidadm'];
    $f=$_POST['categoria'];

    $sql="INSERT INTO producto VALUES (null,'$a','$b','$c','$d','$e','$f')";
    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="SE GUARDÓ CORRECTAMENTE";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL GUARDAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL GUARDAR";

}
echo json_encode($valido);
?>