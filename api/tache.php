<?php
header("Access-Control-Allow-Origin: *"); //autorise toutes les origines
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'database.php';

//Récupération données JSON
$input = json_decode(file_get_contents("php://input"), true);

//Verif methode http
$methode = $_SERVER['REQUEST_METHOD'];

switch ($methode) {
    case 'POST':
        if (isset($input['nom'], $input['id_liste'])) {
            $sql = "INSERT INTO taches (nom, id_liste) VALUES (:nom, :id_liste)";
            executeQuery($sql, [
                ':nom' => $input['nom'],
                ':id_liste' => $input['id_liste'],
            ]);
            echo json_encode(["status" => 200]);
        } else {
            echo json_encode(["status" => 400, "message" => "Erreur " . $input]);
        }
        break;

    case 'PUT':
        if (isset($input['id'], $input['nom'], $input['description'])) {
            $sql = "UPDATE taches SET nom = :nom, description = :description WHERE id = :id";
            executeQuery($sql, [
                ':nom' => $input['nom'],
                ':description' => $input['description'],
                ':id' => $input['id'],
            ]);
            echo json_encode(["status" => 200,]);
        } else {
            echo json_encode(["status" => 400, "message" => "Erreur " . $input]);
        }
        break;

    case 'DELETE':
        if (isset($input['id'])) {
            $sql = "DELETE FROM taches WHERE id = :id";
            executeQuery($sql, [
                ':id' => $input['id']
            ]);
            echo json_encode(["status" => 200, "message" => "ok"]);
        } else {
            echo json_encode(["status" => 400, "message" => "Erreur " . $input]);
        }
        break;

    default:
        echo json_encode(["status" => 405, "message" => "Methode non autorisée"]);
        break;
}
