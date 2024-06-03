<?php
include("../../php/config.php"); 

$query = "SELECT * FROM producto";
$result = $cx->query($query);

if ($result->num_rows > 0) {
    $listaProductos = $result->fetch_all(MYSQLI_ASSOC);
} else {
    $listaProductos = [];
}
?>

<?php
ob_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF PRODUCTOS</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">

</head>
<body class="text-center">
    <h1>REPORTE DE PRODUCTOS</h1>
<table class="table w-75 m-auto mt-4 table-striped-columns table-dark table-bordered border-primary text-center">
    <tr>
        <td>ID</td>
        <td>NOMBRE PRODUCTO</td>
        <td>PRECIO</td>
        <td>CANTIDAD</td>
        <td>PROVEEDOR</td>
        <td>UNIDAD MEDIDA</td>
        <td>CATEGORÍA</td>
    </tr>
    <?php foreach($listaProductos as $item): ?>
    <tr>
        <td><?php echo $item['id']; ?></td>
        <td><?php echo $item['nombrep']; ?></td>
        <td><?php echo $item['precio']; ?></td>
        <td><?php echo $item['cantidad']; ?></td>
        <td><?php echo $item['proveedor']; ?></td>
        <td><?php echo $item['unidadm']; ?></td>
        <td><?php echo $item['categoria']; ?></td>
    </tr>
    <?php endforeach; ?>
</table>
    
</body>
</html>


<?php
$html=ob_get_clean();
//echo $html;
require_once '../libreria/dompdf/autoload.inc.php';
use Dompdf\Dompdf;
$dompdf=new Dompdf();

$options=$dompdf->getOptions();
$options->set(array('isRemoteEnabled'=>true));
$dompdf->setOptions($options);

//$dompdf->loadHtml("HOLA YERSHOP");
$dompdf->loadHtml($html);

$dompdf->setPaper('letter');
//$dompdf->setPaper('A4','landscape');
$dompdf->render();
$dompdf->stream("archivo_.pdf", array("Attachment"=>false));//VISUALIZAR PDF CUANDO ESTA EN FALSE


?>