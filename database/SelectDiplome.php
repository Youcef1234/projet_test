<?php

include_once 'Connexion.php';


try{
    header('Access-Control-Allow-Origin: *');

    error_reporting(E_ERROR | E_PARSE);

    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);

    if (isset($_GET['idcandid']) ? $_GET['idcandid'] : '');

    $req = $conn->prepare("
      SELECT *
      FROM diplome dip
      JOIN candidat_diplome cdip
      ON dip.iddiplome = cdip.iddiplome
     WHERE dip.iddiplome = " . $_GET['idcandid'] . "
    ");

    $req->execute();
    $d = array();
    foreach ($req->fetchAll() as $row) {
        $d['mydb'][] = array(
            'iddiplome' => $row['iddiplome'],
            'type_diplome' => $row['type_diplome'],
            'date_obtention' => $row['date_obtention'],
            'dip_commentaire' => $row['dip_commentaire']

        );

    }

    echo json_encode($d);

}
catch  (PDOException $e)
{
    echo "Connection failed: " . $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine();
}


?>

