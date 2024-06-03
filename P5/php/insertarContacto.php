<?php
require_once "config.php";
header('Content-Type: application/json; charset=utf-8');

if($_POST){
    $action = $_REQUEST['action'];
    switch($action){
        case "registrar":
            $valido['success']=array('success'=>false, 'mensaje'=>"");
            $a = $_POST['email'];
            $b = md5($_POST['pass']);
            $c = $_POST['nombre'];
            $d = $_POST['apellido'];
            $e = $_POST['usuario'];
            $check="SELECT * FROM cecyusuario WHERE usuario='$a'";
            $res=$cx->query($check);
            if ($res->num_rows==0) {
                $sql = "INSERT INTO cecyusuario VALUES (null, '$a', '$b', '$c', '$d', '$e')";
                if ($cx->query($sql)) {
                $valido['success']=true;
                $valido['mensaje']="SE REGISTRO CORRECTAMENTE";
        }else{
                $valido['success']=false;
                $valido['mensaje']="ERROR AL REGISTRAR";
        }
            }else{
                $valido['success']=false;
                $valido['mensaje']="USUARIO NO DISPONIBLE";
            }
            echo json_encode($valido);
            break;
        }
    }else{
        $valido['success']=false;
        $valido['mensaje']="ERROR NO RECIBI NADA";
 }

?>