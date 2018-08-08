<?php

include_once 'Connexion.php';


try{
    header('Access-Control-Allow-Origin: *');

    error_reporting(E_ERROR | E_PARSE);

    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);

    if (isset($_GET['idcandid']) ? $_GET['idcandid'] : '');

    $req = $conn->prepare("
      SELECT *
      FROM experience_pro expro
      JOIN candidat_experience cxp
      ON expro.idexperience_pro = cxp.idexperience
     WHERE expro.idexperience_pro = " . $_GET['idcandid'] . "
    ");

    $req->execute();
    $d = array();
    foreach ($req->fetchAll() as $row) {
        $d['mydb'][] = array(
            'idexperience_pro' => $row['idexperience_pro'],
            'employeur' => $row['employeur'],
            'debut_contrat' => $row['debut_contrat'],
            'fin_contrat' => $row['fin_contrat'],
            'xpro_Commentaire'=>$row['xpro_Commentaire']

        );

    }

    echo json_encode($d);

}
catch  (PDOException $e)
{
    echo "Connection failed: " . $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine();
}


?>

