<?php 
    session_start();

    include('conexion.php');

    if(isset($_POST['Correo']) && isset($_POST['Contraseña'])) {
        function validate($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $Correo = validate($_POST['Correo']);
        $Contraseña = validate($_POST['Contraseña']);

        if(empty($Correo)){
            header("Location: InicioPaciente.html?error=El correo esta vacio");
            exit();
        }elseif (empty($Contraseña)) {
            header("Location: InicioPaciente.html?error=La contraseña esta vacia");
            exit();
        }else{

        // $Contraseña = md5($Contraseña);
        $Sql = "SELECT * FROM Pacientes WHERE Correo = '$Correo' AND Contraseña = '$Contraseña' ";
        $result = mysqli_query($conexion,$Sql);

        if (mysqli_num_rows($result)===1){
            $row = mysqli_fetch_assoc($result);
            if($row['Correo'] === $Correo && $row['Contraseña'] === $Contraseña){
                $_SESSION['Correo'] = $row ['Correo'];
                $_SESSION['Contraseña'] = $row ['Contraseña'];
                $_SESSION['Id'] = $row ['Id'];
                header("Location: Principal - Paciente.html");
                exit();
            }else{
                header("Location: InicioPaciente.html?error=El correo o la contraseña son incorrectos");
                exit();
            }
        }else{
            header("Location: InicioPaciente.html?error=El correo o la contraseña son incorrectos");
                exit();
        }
    }
}else{
    header("Location: InicioPaciente.html");
    exit();
}