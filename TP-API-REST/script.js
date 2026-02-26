/**
 * CONFIGURATION DES URLS DES APIS
 */
// API pour la gestion des tâches (Simule une base de données) [cite: 10, 11]
const URL_TACHES = "https://jsonplaceholder.typicode.com/todos";
// API pour les données sur les chiens [cite: 25]
const URL_CHIENS = "https://dog.ceo/api/breeds";

// ============================================================
// EXERCICE 1 : LISTE DE TÂCHES (TO-DO LIST) [cite: 17]
// ============================================================

// Tableau de secours pour afficher des titres en français [cite: 19]
const traductions = ["Réviser le cours API", "Préparer le TP mobile", "Acheter des composants Edge", "Finir le rapport LST", "Envoyer le code au professeur"];

/**
 * Récupère les tâches depuis l'API (Méthode GET) [cite: 18]
 */
async function chargerTaches() {
    try {
        // Envoi d'une requête GET pour récupérer 5 tâches [cite: 7, 18]
        const res = await fetch(`${URL_TACHES}?_limit=5`); 
        const data = await res.json(); // Conversion de la réponse en JSON 
        
        data.forEach((tache, index) => {
            // Traduction manuelle pour l'interface [cite: 19]
            tache.title = traductions[index] || tache.title;
            afficherTache(tache);
        });
    } catch (err) { 
        console.error("Erreur lors du chargement des tâches :", err); 
    }
}

/**
 * Affiche une tâche dans le DOM (Interface utilisateur) [cite: 14, 19]
 */
function afficherTache(tache) {
    const li = document.createElement('li');
    // On ajoute un style barré si la tâche est déjà complétée [cite: 21]
    li.innerHTML = `
        <span style="${tache.completed ? 'text-decoration:line-through; color:gray' : ''}">${tache.title}</span>
        <button class="done-btn" onclick="terminerTache(${tache.id}, this)">Terminé</button>
    `; // Bouton pour déclencher la mise à jour [cite: 20]
    document.getElementById('todoList').appendChild(li);
}

/**
 * Ajoute une nouvelle tâche via l'API (Méthode POST) [cite: 23]
 */
async function addTask() {
    const titre = document.getElementById('taskInput').value;
    if (!titre) return; // Évite d'ajouter des tâches vides

    // Envoi d'une requête POST avec les données de la tâche [cite: 7, 23]
    const res = await fetch(URL_TACHES, {
        method: 'POST', 
        body: JSON.stringify({ title: titre, completed: false, userId: 1 }),
        headers: { 'Content-type': 'application/json' }
    });
    
    const nouvelleTache = await res.json();
    afficherTache(nouvelleTache); // Mise à jour de l'affichage local
    document.getElementById('taskInput').value = ""; // Vide le champ de saisie
    document.getElementById('todoStatus').innerText = "Confirmation : Tâche ajoutée !"; 
}

/**
 * Marque une tâche comme terminée (Méthode PUT) [cite: 21]
 */
async function terminerTache(id, bouton) {
    try {
        // Envoi d'une requête PUT pour modifier l'état 'completed' [cite: 7, 21]
        await fetch(`${URL_TACHES}/${id}`, {
            method: 'PUT', 
            body: JSON.stringify({ completed: true }),
            headers: { 'Content-type': 'application/json' }
        });
        
        // Modification visuelle immédiate après succès [cite: 22]
        const texte = bouton.previousElementSibling;
        texte.style.textDecoration = "line-through";
        texte.style.color = "gray";
        document.getElementById('todoStatus').innerText = "Succès : Tâche marquée comme terminée !"; 
    } catch (e) { 
        console.error("Erreur lors de la mise à jour :", e); 
    }
}

// ============================================================
// EXERCICE 2 : RECHERCHE DE CHIENS [cite: 24]
// ============================================================

let listeRaces = []; // Stockage local des races pour le filtrage [cite: 29]

/**
 * Charge la liste de toutes les races de chiens (Méthode GET) [cite: 25]
 */
async function chargerRaces() {
    const res = await fetch(`${URL_CHIENS}/list/all`); 
    const data = await res.json();
    listeRaces = Object.keys(data.message); // Récupère les noms des races
    remplirSelect(listeRaces); // Remplit la liste déroulante [cite: 26]
}

/**
 * Remplit l'élément <select> avec les races fournies [cite: 26]
 */
function remplirSelect(races) {
    const select = document.getElementById('breedSelect');
    select.innerHTML = '<option value="">-- Sélectionnez une race --</option>';
    races.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r;
        opt.innerText = r.charAt(0).toUpperCase() + r.slice(1); // Première lettre en majuscule
        select.appendChild(opt); 
    });
}

/**
 * Filtre les races affichées selon la saisie de l'utilisateur [cite: 29]
 */
function filterBreeds() {
    const mot = document.getElementById('breedSearch').value.toLowerCase();
    const filtre = listeRaces.filter(r => r.includes(mot));
    remplirSelect(filtre); 
}

/**
 * Affiche des images pour la race sélectionnée [cite: 27, 28]
 */
async function loadDogImages() {
    const race = document.getElementById('breedSelect').value;
    if(!race) return;
    
    // Requête GET pour obtenir les images d'une race spécifique [cite: 27]
    const res = await fetch(`${URL_CHIENS}/breed/${race}/images`); 
    const data = await res.json();
    const grille = document.getElementById('dogGrid');
    
    // On affiche les 6 premières images dans la grille [cite: 28]
    grille.innerHTML = data.message.slice(0, 6).map(img => `<img src="${img}">`).join(''); 
}

// ============================================================
// EXERCICE 3 : CONVERTISSEUR DE DEVISES [cite: 30]
// ============================================================

/**
 * Initialise les devises et les menus déroulants [cite: 31, 32]
 */
async function initConvertisseur() {
    const res = await fetch("https://open.er-api.com/v6/latest/MAD");
    const data = await res.json();
    const devises = Object.keys(data.rates);
    const selects = [document.getElementById('fromCurrency'), document.getElementById('toCurrency')];
    
    selects.forEach(s => {
        devises.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d; opt.innerText = d;
            s.appendChild(opt); // Ajout des options de devise [cite: 32]
        });
    });
    // Valeurs par défaut
    document.getElementById('fromCurrency').value = "MAD";
    document.getElementById('toCurrency').value = "EUR";
}

/**
 * Calcule et affiche la conversion (Méthode GET) [cite: 34]
 */
async function convertCurrency() {
    const de = document.getElementById('fromCurrency').value;
    const a = document.getElementById('toCurrency').value;
    const montant = document.getElementById('amount').value; 

    // Récupère le taux de change actuel [cite: 34]
    const res = await fetch(`https://open.er-api.com/v6/latest/${de}`);
    const data = await res.json();
    const taux = data.rates[a];
    
    // Calcul du résultat final
    const total = (montant * taux).toFixed(2);
    document.getElementById('conversionResult').innerText = `Résultat : ${montant} ${de} = ${total} ${a}`; 
}

/**
 * LANCEMENT AUTOMATIQUE AU CHARGEMENT DE LA PAGE
 */
window.onload = () => {
    chargerTaches();
    chargerRaces();
    initConvertisseur();
};