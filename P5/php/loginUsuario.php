<?php
require_once "config.php";
header('Content-Type: text/html; charset=utf-8');

if($_POST){
    $action=$_REQUEST['action'];
    switch($action){
        case "registrar":
            $valido['success']=array('success'=>false,'mensaje'=>"");            
            $a=$_POST['email'];
            $b=md5($_POST['password']);
            $c=$_POST['nombre'];
            $d=$_POST['apellido'];
            $e=$_POST['usuario'];
            $check="SELECT * FROM cecyusuario WHERE usuario='$a'";
            $res=$cx->query($check);
            if($res->num_rows==0){
                $sql="INSERT INTO cecyusuario VALUES (null,'$a','$b','$c','$d','$e')";
                if($cx->query($sql)){
                    $valido['success']=true;
                    $valido['mensaje']="SE REGISTRO CORRECTAMENTE";
                }else {
                    $valido['success']=false;
                    $valido['mensaje']="ERROR AL REGISTRAR";
                }
            }else{
                $valido['success']=false;
                $valido['mensaje']="USUARIO NO DISPONIBLE";
            }
            echo json_encode($valido);
            break;
        case "login":
            $valido['success']=array('success'=>false,'mensaje'=>"");            
            $a=$_POST['email'];
            $b=md5($_POST['password']);
            $check="SELECT * FROM cecyusuario WHERE usuario='$a' AND password ='$b';";
            $res=$cx->query($check);
            if($res->num_rows>0){
                $valido['success']=true;
                $valido['mensaje']="SE INICIO CORRECTAMENTE";
            }else {
                $valido['success']=false;
                $valido['mensaje']="USUARIO Y/O PASSWORD INCORRECTO";
            }           
            echo json_encode($valido);

            break;
        case "select":
            header('Content-Type: text/html; charset=utf-8');
                $valido['success']=array('success'=>false,'mensaje'=>"");            
                $a=$_POST['usuario'];
                $check="SELECT * FROM cecyusuario WHERE usuario='$a';";
                $res=$cx->query($check);
                if($res->num_rows>0){
                    $row=$res->fetch_array();
                    $valido['success']=true;
                    $valido['mensaje']=$row[5];
                }else {
                    $valido['success']=false;
                    $valido['mensaje']="USUARIO Y/O PASSWORD INCORRECTO";
                }           
                echo json_encode($valido);
    
                break;
    }
}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR NO SE RECIBIO NADA";
}
?>