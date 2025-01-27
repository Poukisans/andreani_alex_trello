<?php
header("Access-Control-Allow-Origin: *");  //autorise toutes les origines
header("Content-Type: application/json");
require_once 'database.php';

//id di tableau
$id_tableau = $_GET['id'] ?? null;
if (empty($id_tableau)) {
    echo json_encode(["status" => 400, "message" => "Pas d'ID "]);
    exit;
}

//verif methode http get
$methode = $_SERVER['REQUEST_METHOD'];
if ($methode !== "GET") {
    echo json_encode(["status" => 405, "message" => "Methode incorrecte"]);
    exit;
}

if ($id_tableau && $methode === "GET") {
    // ====== info tableau ======
    $sql1 = "SELECT
            tableau.id AS id_tableau,
            tableau.nom AS nom_tableau
        FROM
            tableau
        WHERE
            tableau.id = :id_tableau";

    $tableau = executeQuery($sql1, [':id_tableau' => $id_tableau])->fetch();

    // ====== liste du tableau ======
    if ($tableau) {
        $sql2 = "SELECT
                listes.id AS id_liste,
                listes.nom AS liste_titre
            FROM
                listes
            WHERE
                listes.id_tableau = :id_tableau";

        $listes = executeQuery($sql2, [':id_tableau' => $id_tableau])->fetchAll();

        // ====== taches de chaque liste ======
        foreach ($listes as &$liste) {
            $sql3 = "SELECT
                        taches.id AS id_tache,
                        taches.nom AS nom,
                        taches.description AS description
                    FROM
                        taches
                    WHERE
                        taches.id_liste = :id_liste";

            $tache = executeQuery($sql3, [':id_liste' => $liste['id_liste']])->fetchAll();
            $liste['taches'] = $tache;
        }

        //json structuré des infos du tableau
        $response = [
            "status" => 200,
            "data" => [
                "id_tableau" => $tableau['id_tableau'],
                "nom_tableau" => $tableau['nom_tableau'],
                "listes" => $listes
            ]
        ];

        echo json_encode($response);
    } else {
        echo json_encode(["status" => 404, "message" => "Ressource non trouvée"]);
    }
}
