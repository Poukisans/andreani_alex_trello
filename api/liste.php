<?php
header("Access-Control-Allow-Origin: *"); //autorise toutes les origines
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'database.php';

//Récupération données JSON
$input = json_decode(file_get_contents("php://input"), true);

//Verif methode http
$methode = $_SERVER['REQUEST_METHOD'];

switch ($methode) {
    case 'POST':
        if (isset($input['nom'], $input['id_tableau'])) {
            $sql = "INSERT INTO listes (nom, id_tableau) VALUES (:nom, :id_tableau)";
            executeQuery($sql, [
                ':nom' => $input['nom'],
                ':id_tableau' => $input['id_tableau'],
            ]);
            echo json_encode(["status" => 200]);
        } else {
            echo json_encode(["status" => 400, "message" => "Erreur " . $input]);
        }
        break;

    case 'DELETE':
        if (isset($input['id_liste'])) {
            $sql = "DELETE FROM listes WHERE id = :id_liste";
            executeQuery($sql, [
                ':id_liste' => $input['id_liste']
            ]);
            echo json_encode(["status" => 200]);
        } else {
            echo json_encode(["status" => 400, "message" => "Erreur " . $input]);
        }
        break;

    default:
        echo json_encode(["status" => 405, "message" => "Methode non autorisée"]);
        break;
}
