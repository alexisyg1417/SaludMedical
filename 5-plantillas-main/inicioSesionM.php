<?php 
    session_start();

    include('conexion.php');

    if(isset($_POST['Correo']) && isset($_POST['Contraseña']) && isset($_POST['Matricula'])) {
        function validate($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $Correo = validate($_POST['Correo']);
        $Contraseña = validate($_POST['Contraseña']);
        $Matricula = validate($_POST['Matricula']);

        if(empty($Correo)){
            header("Location: InicioMedico.html?error=El correo esta vacio");
            exit();
        }elseif (empty($Contraseña)) {
            header("Location: InicioMedico.html?error=La contraseña esta vacia");
            exit();
        }elseif (empty($Matricula)) {
            header("Location: InicioMedico.html?error=La matrícula esta vacia");
        }
        else{

        // $Contraseña = md5($Contraseña);
        $Sql = "SELECT * FROM Doctores WHERE Correo = '$Correo' AND Contraseña = '$Contraseña' AND Matricula = '$Matricula' ";
        $result = mysqli_query($conexion,$Sql);

        if (mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            if($row['Correo'] === $Correo && $row['Contraseña'] === $Contraseña && $row['Matricula'] === $Matricula){
                $_SESSION['Correo'] = $row ['Correo'];
                $_SESSION['Contraseña'] = $row ['Contraseña'];
                $_SESSION['Matricula'] = $row ['Matricula'];
                $_SESSION['Id'] = $row ['Id'];
                header("Location: Principal - Doctor.html");
                exit();
            }else{
                header("Location: InicioMedico.html?error=El correo, la contraseña o la matrícula son incorrectos");
                exit();
            }
        }else{
            header("Location: InicioMedico.html?error=El correo, la contraseña o la matrícula son incorrectos");
                exit();
        }
    }
}else{
    header("Location: InicioMedico.html");
    exit();
}