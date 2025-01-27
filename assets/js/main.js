document.addEventListener("DOMContentLoaded", function () {
    const tableauId = getTableauId()
    getTableauData(tableauId);
})

function getTableauId() {
    id = 1
    return id

    // === Gestion tableau multiple ===
    // id = new URLSearchParams(window.location.search).get('id');
    // if (!id) {
    //     console.error("Aucun ID de tableau défini");
    //     return 1;
    // } else {
    //     return id
    // }
}


//Afficher contenu du trello
function displayTableau(data) {
    //affichage nom tableau
    const nomTableau = document.getElementById("nomTableau");
    nomTableau.textContent = `${data.nom_tableau}`;

    //============ Affichage listes ============
    const listeContainer = document.getElementById("listeContainer"); //div où les listes du tableau seront injectées
    const listTemplate = document.getElementById("listTemplate"); //récupère template liste

    listeContainer.replaceChildren(); //vide le contenu pour le chargement après update

    data.listes.forEach(liste => {
        const listeClone = document.importNode(listTemplate.content, true);

        const listHeader = listeClone.querySelector("#listTitle");
        listHeader.textContent = liste.liste_titre;

        const deleteListeButton = listeClone.querySelector("#deleteListeButton")
        deleteListeButton.addEventListener('click', () => submitDeleteListe(liste.id_liste))

        //============ Affichage taches ============
        const tacheContainer = listeClone.querySelector("#tacheContainer"); //div où les tâches seront injectées
        const tacheTemplate = tacheContainer.querySelector("#tacheTemplate"); //récupère template tâche
        liste.taches.forEach(tache => {
            const tacheClone = document.importNode(tacheTemplate.content, true);

            const editTacheButton = tacheClone.querySelector("#editTacheButton");
            editTacheButton.addEventListener('click', () => editTache(tache.id_tache, tache.nom, tache.description));
            const tacheTitle = tacheClone.querySelector("#tacheTitle");
            tacheTitle.textContent = tache.nom;

            tacheContainer.appendChild(tacheClone);
        });

        const toggleAddTacheButton = listeClone.getElementById("toggleAddTache");
        const listFooter = listeClone.querySelector("#listFooter");
        toggleAddTacheButton.addEventListener('click', () => toggleAddTache(listFooter, liste.id_liste));

        listeContainer.appendChild(listeClone);
    });

    //FONCTIONS LISTE
    function toggleAddTache(footerDiv, listId) {
        const isActive = footerDiv.dataset.formState === "active";

        if (!isActive) {
            footerDiv.dataset.formState = "active";
            footerDiv.innerHTML = `
                <div class="w-100">
                    <form class="container w-100" action="" id="addTacheForm">
                        <input class="form-input" type="text" name="nom" placeholder="Titre">
                        <div class="row w-100">
                            <button class="button button_blue w-100" type="submit" onclick="submitAddTache(event, ${listId})">
                                <img class="img_icon" src="assets/icon/plus_white.svg" alt="">
                                Ajouter tâche
                            </button>
                            <button class="button button_transparent" type="button" id="toggleAddTache">
                                <img class="img_icon" src="assets/icon/cross.svg" alt="">
                            </button>
                        </div>
                    </form>
                </div>
            `;
        } else {
            footerDiv.dataset.formState = "inactive";
            footerDiv.innerHTML = `
                <button class="button button_transparent w-100" id="toggleAddTache">
                    <img class="img_icon" src="assets/icon/plus.svg" alt="">
                    Ajouter
                </button>
            `;
        }

        const newToggleButton = footerDiv.querySelector("#toggleAddTache");
        newToggleButton.addEventListener("click", () => toggleAddTache(footerDiv, listId));
    }
}

function editTache(id, nom, description) {
    const editTacheTemplate = document.getElementById("editTacheTemplate");
    const modalBody = document.getElementById("modalBody");

    modalBody.replaceChildren();//vider le contenu


    const editTacheClone = document.importNode(editTacheTemplate.content, true);
    const inputs = editTacheClone.querySelectorAll("input");
    if (inputs.length > 0) {
        inputs[0].value = nom;
        inputs[1].value = description || "";
    }
    const submitButton = editTacheClone.querySelector("#updateTacheButton");
    submitButton.setAttribute("onclick", `submitEditTache(event, ${id})`);

    const deleteButton = editTacheClone.querySelector("#deleteTacheButton");
    deleteButton.setAttribute("onclick", `submitDeleteTache(event, ${id})`);

    modalBody.appendChild(editTacheClone);

    //afficher le modal
    toggleModal();
}

function addList() {
    const tableauId = getTableauId()

    const addListeTemplate = document.getElementById("addListeTemplate");
    const modalBody = document.getElementById("modalBody");

    modalBody.replaceChildren();//vider le contenu

    const addListeClone = document.importNode(addListeTemplate.content, true);
    const inputs = addListeClone.querySelectorAll("input");

    const submitButton = addListeClone.querySelector("#addListButton");
    submitButton.setAttribute("onclick", `submitAddListe(event, ${tableauId})`);

    modalBody.appendChild(addListeClone);

    //afficher le modal
    toggleModal();
}


function toggleModal() {
    const modal = document.getElementById("modal");
    const isActive = modal.dataset.modalState;

    if (!isActive || isActive === "inactive") {
        modal.dataset.modalState = "active";
        modal.style.display = "block";
    } else {
        modal.dataset.modalState = "inactive";
        modal.style.display = "none";
    }
    return modal;
}

