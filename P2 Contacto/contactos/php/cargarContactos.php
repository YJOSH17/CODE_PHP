<?php
require_once "config.php";
header('Content-Type: text/html; charset=utf-8');

$sql="SELECT * FROM contacto";
$registros=array('data'=>array());
$res=$cx->query($sql);
if($res->num_rows>0){
    while($row=$res->fetch_array()){
        $registros['data'][]=array($row[0],$row[1],$row[2],$row[3],$row[4]);
    }
}

echo json_encode($registros);

?>