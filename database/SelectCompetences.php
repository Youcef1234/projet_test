<?php


include_once 'Connexion.php';

error_reporting(E_ERROR | E_PARSE);

try
{
    header('Access-Control-Allow-Origin: *');

    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);

    $idcandid = (isset($_GET['idcandid'])) ? $_GET['idcandid']: null;

    $req = $conn->prepare("
      SELECT *
      FROM competence c
      JOIN candidat_competences cc 
      ON c.idcompetence=cc.idcompet
     WHERE c.idcompetence= ". $_GET['idcandid'] ."
    ");

    $req->execute();
    $d = array();
    foreach ($req->fetchAll() as $row) {
        $d['mydb'][] = array(
            'idcompetence' => $row['idcompetence'],
            'com_nom' => $row['com_nom'],
            'com_evaluation' => $row['com_evaluation'],
            'com_commentaire' => $row['com_commentaire'],
        );

    }

  echo json_encode($d);

}
catch  (PDOException $e)
{
    echo "Connection failed: " . $e->getMessage() . ' in ' . $e->getFile() . ' on line ' . $e->getLine();
}

?>
