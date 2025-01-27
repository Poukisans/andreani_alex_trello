const adresseApi = "https://127.0.0.1/trello/api"

//======================= Récupérer données du trello =======================
function getTableauData(id) {
   fetch(`${adresseApi}/tableau.php?id=${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        displayTableau(data.data);  // Affichage des données une fois récupérées
      }
    })
    .catch(error => {
      console.error("Erreur de connexion à l'API:", error);
    });
}

//======================= Ajouter tache liste =======================
function submitAddTache(event, listId) {
  event.preventDefault();
  const submitButton = event.target;
  const form = submitButton.closest("form"); //récupérer le formulaire parent
  addTacheFormData = new FormData(form)

  const jsonData = {}
  addTacheFormData.forEach((value, key) => {
    jsonData[key] = value;
  });
  jsonData.id_liste = listId;//ajout id liste au data du json
  const json = JSON.stringify(jsonData);

  fetch(`${adresseApi}/tache.php`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const tableauId = getTableauId()
        getTableauData(tableauId);
      } else {
        console.error('Erreur dans la réponse de l\'API :', data);
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête :', error);
    })
}

//======================= Editer tache =======================
function submitEditTache(event, tacheId) {
  event.preventDefault();
  const submitButton = event.target;
  const form = submitButton.closest("form");
  const editTacheFormData = new FormData(form);

  const jsonData = {};
  editTacheFormData.forEach((value, key) => {
    jsonData[key] = value;
  });
  jsonData.id = tacheId;

  const json = JSON.stringify(jsonData);

  fetch(`${adresseApi}/tache.php`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const tableauId = getTableauId();
        getTableauData(tableauId);
        toggleModal();
      } else {
        console.error('Erreur dans la réponse de l\'API :', data);
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête :', error);
    });
}

//======================= Editer tache =======================
function submitDeleteTache(event, tacheId) {
  event.preventDefault();
  const submitButton = event.target;

  const jsonData = {};
  jsonData.id = tacheId;

  const json = JSON.stringify(jsonData);

  fetch(`${adresseApi}/tache.php`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const tableauId = getTableauId();
        getTableauData(tableauId);
        toggleModal();
      } else {
        console.error('Erreur dans la réponse de l\'API :', data);
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête :', error);
    });
}

//======================= Ajouter liste =======================
function submitAddListe(event, tableauId) {
  event.preventDefault();
  const submitButton = event.target;
  const form = submitButton.closest("form");
  const addListeFormData = new FormData(form);

  const jsonData = {};
  addListeFormData.forEach((value, key) => {
    jsonData[key] = value;
  });
  jsonData.id_tableau = tableauId;

  const json = JSON.stringify(jsonData);
  console.log(json)

  fetch(`${adresseApi}/liste.php`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const tableauId = getTableauId();
        getTableauData(tableauId);
        toggleModal();
      } else {
        console.error('Erreur dans la réponse de l\'API :', data);
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête :', error);
    });
}

//======================= Supprimer liste =======================
function submitDeleteListe(listeId) {

  const jsonData = {};
  jsonData.id_liste = listeId;

  const json = JSON.stringify(jsonData);
  console.log(json)

  fetch(`${adresseApi}/liste.php`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const tableauId = getTableauId();
        getTableauData(tableauId);
      } else {
        console.error('Erreur dans la réponse de l\'API :', data);
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la requête :', error);
    });
}

