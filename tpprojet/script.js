let motADeviner = ""; // Initialisation du mot à deviner
let motCache = []; // Tableau pour les lettres trouvées
let essais = 6; // Nombre maximum d'essais
let lettresIncorrectes = [];

// Affichage initial
document.getElementById("mot").innerText = "_ _ _ _ _ _ ";
document.getElementById("essais").innerText = essais;

// Fonction pour ajuster la largeur du container en fonction du mot
function ajusterLargeurContainer() {
  const container = document.querySelector(".container");
  const longueurMot = motADeviner.length; // Calculer la longueur du mot
  const largeur = longueurMot * 30 + 50; // Calcul de la largeur (ajustez les valeurs selon votre besoin)
  container.style.width = `${largeur}px`; // Appliquer la largeur calculée au container
}

// Fonction pour détecter si la touche Entrée est pressée
function detecterEntree(event) {
  if (event.key === "Enter") {
      choisirMotADeviner(); // Appel de la fonction de validation du mot
  }
}
// Fonction pour choisir le mot à deviner
function choisirMotADeviner() {
    const inputMot = document.getElementById("motADeviner");
    motADeviner = inputMot.value.toLowerCase(); // Enregistrer le mot en minuscule
    if (motADeviner && /^[a-zA-Z]+$/.test(motADeviner)) { // Vérifier que le mot est valide
        motCache = Array(motADeviner.length).fill("_"); // Masquer le mot
        document.getElementById("mot").innerText = motCache.join(" ");
        document.getElementById("motadeviner").style.display = "none"; // Masquer le champ de choix du mot
        document.getElementById("message").innerText = "Mot choisi ! Commencez à deviner.";
    } else {
        document.getElementById("message").innerText = "Entrez un mot valide sans espaces.";
    }
}

// Fonction pour détecter si la touche Entrée est pressée
function detecterEntree(event) {
  if (event.key === "Enter") {
      verifierLettre(); // Appel de la fonction de validation du mot
  }
}

// Fonction pour vérifier la lettre entrée par le joueur
function verifierLettre() {
    const lettreInput = document.getElementById("lettre");
    const lettre = lettreInput.value.toLowerCase();

    // Vérifier si la lettre est valide
    if (lettre && lettre.length === 1 && /^[a-zA-Z]$/.test(lettre)) {
        if (motADeviner.includes(lettre)) {
            // Si la lettre est dans le mot, révéler sa position
            for (let i = 0; i < motADeviner.length; i++) {
                if (motADeviner[i] === lettre) {
                    motCache[i] = lettre;
                }
            }
            document.getElementById("mot").innerText = motCache.join(" ");
            verifierVictoire();
        } else {
            // Si la lettre n'est pas dans le mot, ajouter aux lettres incorrectes
            if (!lettresIncorrectes.includes(lettre)) {
                lettresIncorrectes.push(lettre);
                essais--;
                document.getElementById("essais").innerText = essais;
                document.getElementById("lettresIncorrectes").innerText = lettresIncorrectes.join(", ");
                verifierDefaite();
            }
        }
        lettreInput.value = ""; // Réinitialiser le champ de saisie
    } else {
        document.getElementById("message").innerText = "Entrez une seule lettre valide.";
    }
}

// Fonction pour afficher la popup
function afficherPopup(message) {
  document.getElementById("popupMessage").innerText = message;
  document.getElementById("popup").style.display = "flex"; // Affiche la popup en mode flex
}

// Fonction pour fermer la popup
function fermerPopup() {
  document.getElementById("popup").style.display = "none"; // Cache la popup
}

// Fonction pour vérifier si le joueur a gagné
function verifierVictoire() {
  if (motCache.join("") === motADeviner) {
      afficherPopup("Félicitations ! Vous avez deviné le mot.");
      desactiverJeu();
  }
}

// Fonction pour vérifier si le joueur a perdu
function verifierDefaite() {
  if (essais === 0) {
      afficherPopup(`Vous avez perdu ! Le mot était : ${motADeviner}`);
      desactiverJeu();
  }
}


// Fonction pour désactiver le jeu après victoire ou défaite
function desactiverJeu() {
    document.getElementById("lettre").disabled = true;
    document.querySelector("button").disabled = true;
}


// Fonction pour réinitialiser le jeu
function resetJeu() {
  motADeviner = ""; // Réinitialiser le mot à deviner
  motCache = []; // Réinitialiser le tableau des lettres cachées
  essais = 6; // Réinitialiser le nombre d'essais
  lettresIncorrectes = []; // Réinitialiser les lettres incorrectes

  // Réinitialiser l'affichage
  document.getElementById("mot").innerText = "_ _ _ _ _ _ ";
  document.getElementById("essais").innerText = essais;
  document.getElementById("lettresIncorrectes").innerText = "";
  document.getElementById("message").innerText = "Entrez un mot à deviner.";

  // Réactiver les éléments du jeu
  document.getElementById("lettre").disabled = false;
  document.querySelector("button").disabled = false;

  // Réafficher le champ pour entrer le mot à deviner
  document.getElementById("motadeviner").style.display = "block"; // Afficher le champ de choix du mot
}
