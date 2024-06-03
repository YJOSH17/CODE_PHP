<center>
<!-- <?php

echo "<h1 style='color: red' >HOLA MUNDO</h1>";
echo "<h1 style='color: blue' >OPERACIONES</h1>";

?>-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>OPERACIONES</title>
</head>
<body class="text-center">
<nav class="navbar bg-primary" data-bs-theme="dark">  
    <div class="container-fluid text-center">
        <h1 class="navbar-brand m-auto">MARION SOFIA M.B</h1> 
        <h1 class="navbar-brand m-auto">OPERACIONES</h1>
        <h1 class="navbar-brand m-auto">JOSHUA YERAY B.G</h1> 
</div>
</nav>

<div class="card text-center w-50">
  <div class="card-header">
    OPERACIONES 405
  </div>
  <div class="card-body">
<form action="hola.php" method="POST">
    <h2>NUMERO 1:</h2>
<input type="number" name="a" id=""><br>
    <h2>NUMERO 2:</h2>
<input type="number" name="b" id=""><br><br>
<input type="submit" class="btn btn-primary" value="OPERACIONES" id=""><br>

</form>
<div class="card-footer text-body-secondary">
    GRUPO:405
  </div>
</div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="sweetalert2.all.min.js"></script>
    <script src="bootstrap.min.js"></script>
</body>
</html>

<?php
if (empty($_REQUEST['a'])||empty($_REQUEST['b'])) {
    echo '<script type="text/javascript">
    Swal.fire({
        title: "ERROR",
        text: "CAMPOS VACIOS",
        icon:"error"
    });
    </script>';
}else{

    $a=@$_REQUEST['a'];
    $b=@$_REQUEST['b'];
    $suma=$a+$b;
    $res=$a-$b;
    $mul=$a*$b;
    $div=$a/$b;
    $mod=$a%$b;
    if ($a>$b){
        $mayor=$a;
        $menor=$b;
       }else{
        $mayor=$b;
        $menor=$a;
       }
    echo "<h1 >SUMA: ".$suma."</h1>";
    echo "<h1 >RESTA: ".$res."</h1>";
    echo "<h1 >MULTIPLICACION: ".$mul."</h1>";
    echo "<h1 >DIVICION: ".$div."</h1>";
    echo "<h1 >MODULO: ".$mod."</h1>";
    echo "<h1 >MAYOR: ".$mayor."</h1>";
    echo "<h1 >MENOR: ".$menor."</h1>";
    echo "<h1 > NUMERO: ".$a." ES ".(($a%2==0)?"PAR":"IMPAR")."</h1>";
    echo "<h1 > NUMERO: ".$b." ES ".(($b%2==0)?"PAR":"IMPAR")."</h1>";
  
   
    }    
?>

</center>

