<?php
require_once "config.php";
$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $a=$_POST['nombre'];
    $b=$_POST['ap'];
    $c=$_POST['am'];
    $d=$_POST['telefono'];

    $sql="INSERT INTO contacto VALUES (null,'$a','$b','$c','$d')";
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