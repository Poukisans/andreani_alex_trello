<!DOCTYPE html>
<html lang="fr">

<head>
    <?php
    require "config.php";
    ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <title><?= SITE_NAME ?></title>

    <base href="<?= BASE_URL ?>">

    <!-- Gabrito Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
</head>

<body class="gabarito_regular">

    <header class="row">
        <div class="logo row">
            <div class="logo_icon">
                <img src="" alt="">
            </div>
            <div class="name">
                <h1 class="gabarito_title"><?= SITE_NAME ?></h1>
            </div>
        </div>

        <div class="tab_name row gabarito_subtitle">
            <p id="nomTableau">#nom tableau</p>
        </div>
    </header>

    <main class="container">

        <div class="tableau_container row">

            <div class="tableau row" id="listeContainer">
                <!-- contenu liste -->
            </div>

            <div class="container add_list h-100">
                <button class="button button_transparent" onclick="addList()">
                    <img class="img_icon" src="assets/icon/plus.svg" alt="">
                    Nouvelle liste
                </button>
            </div>
        </div>

        <!-- Modal -->
        <div id="modal" class="modal" data-modalState="inactive">
            <form action="">
                <div class="modal_body" id="modalBody">
                    <!-- Contenu modal -->
                </div>
            </form>
        </div>

    </main>

    <!-- template modal ajout liste -->
    <template id="addListeTemplate">
        <div class="modal_header gabarito_title row">
            <p>Ajout liste</p>

            <button class="button button_transparent" type="button" onclick="toggleModal()">
                <img class="img_icon" src="assets/icon/cross.svg" alt="">
            </button>
        </div>

        <div class="modal_content container">
            <div class="container">
                <label class="gabarito_subtitle" for="">Nom</label>
                <input class="form-input" type="text" name="nom" id="">
            </div>
        </div>

        <div class="modal_footer row ">
            <button class="button button_blue w-100" type="submit" id="addListButton">
                <img class="img_icon" src="assets/icon/plus_white.svg" alt="">
                Ajouter liste
            </button>
        </div>
    </template>

    <!-- template modal edition tache -->
    <template id="editTacheTemplate">
        <div class="modal_header gabarito_title row">
            <p>Modification tâche</p>

            <button class="button button_transparent" type="button" onclick="toggleModal()">
                <img class="img_icon" src="assets/icon/cross.svg" alt="">
            </button>
        </div>

        <div class="modal_content container">
            <div class="container">
                <label class="gabarito_subtitle" for="">Nom</label>
                <input class="form-input" type="text" name="nom" id="">
            </div>

            <div class="container">
                <label class="gabarito_subtitle" for="">Description</label>
                <input class="form-input" type="text" name="description" id="">
            </div>
        </div>

        <div class="modal_footer row ">
            <button class="button button_blue w-100" type="submit" id="updateTacheButton">
                <img class="img_icon" src="assets/icon/plus_white.svg" alt="">
                Mettre à jour la tâche
            </button>

            <button class="button button_red" type="button" id="deleteTacheButton">
                <img class="img_icon" src="assets/icon/cross_white.svg" alt="">
            </button>
        </div>
    </template>

    <!-- template liste -->
    <template id="listTemplate">
        <div class="list container">
            <div class="list_header gabarito_subtitle row" id="listHeader">
                <p id="listTitle">#liste</p>

                <button class="button button_transparent" type="button" id="deleteListeButton">
                    <img class="img_icon" src="assets/icon/cross.svg" alt="">
                </button>
            </div>

            <div class="list_content" id="tacheContainer">
                <template id="tacheTemplate">
                    <button class="card" id="editTacheButton">
                        <div class="card_title">
                            <p id="tacheTitle">#tache</p>
                        </div>
                        <div class="card_content"></div>
                    </button>
                </template>
            </div>

            <div class="list_footer row" id="listFooter" data-formState="inactive">
                <button class="button button_transparent w-100" id="toggleAddTache">
                    <img class="img_icon" src="assets/icon/plus.svg" alt="">
                    Nouvelle tâche
                </button>
            </div>
        </div>
    </template>

    <script src="assets/js/api.js"></script>
    <script src="assets/js/main.js"></script>
</body>

</html>