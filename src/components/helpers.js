export function loadPanier() {
  const existingPanier = localStorage.getItem("panier");
  let panier = [];

  if (existingPanier) {
    panier = JSON.parse(existingPanier);
  }
  return panier;
}

// panier: Array représantant le panier au format [{id, quantity, price}]
// produit: le produit qui nous intéresse. Au format {id, name, description...}

// retourne la quantité du produit dans le panier
export function loadQuantity(panier, produit) {
  // On cherche le produit dans le panier
  const produitDansPanier = panier.find((product) => product.id == produit.id);
  let quantity = 0;
  // Si il y a le produit dans panier
  if (produitDansPanier) {
    // On prend la quantité
    quantity = produitDansPanier.quantity;
  }
  return quantity;
}

// panier: Array représantant le panier au format [{id, quantity, price}]
// produit: le produit qui nous intéresse. Au format {id, name, description...}

// Ajoute des eventlistener sur les boutons pour le produit
export function addPanierListeners(produit, panier) {
  //Ajouter les eventListeners correctement
  const btn_moins = document.querySelector(`#btn_moins_${produit.id}`);
  const btn_plus = document.querySelector(`#btn_plus_${produit.id}`);
  const btn_ajout = document.querySelector(`#btn_ajout_${produit.id}`);
  const counter = document.querySelector(`#counter_${produit.id}`);
  const btn_delete = document.querySelector(`#btn_delete_${produit.id}`);

  // Bouton moins
  btn_moins.addEventListener("click", () => {
    if (parseInt(counter.value, 10) > 0) {
      counter.value = parseInt(counter.value, 10) - 1;
    }
  });

  // Bouton plus
  btn_plus.addEventListener("click", () => {
    counter.value = parseInt(counter.value, 10) + 1;
  });

  // If pcq ca fou un bug dans panier, car il n'y a pas le bouton ajouter
  if (btn_ajout) {
    // Bouton ajouter
    btn_ajout.addEventListener("click", () => {
      // On cherche si le produit est déjà dans le panier
      const elementFromPanier = panier.find(
        (element) => element.id == produit.id
      );
      // Si il est déjà danns le panier
      if (elementFromPanier) {
        // On met à jour la quantité
        elementFromPanier.quantity = counter.value;
      } else {
        // Pas encore dans le panier alors on l'ajour dans le panier
        panier.push({
          id: produit.id,
          quantity: counter.value,
          price: produit.price,
        });
        // j'ai ajouté la propriété price pour simplifier le calcul de la somme
        // [] = un array, {} = objet
      }

      const panierFiltered = panier.filter((element) => element.quantity > 0);

      localStorage.setItem("panier", JSON.stringify(panierFiltered));

      // Refresh la page pour voir le total du panier
      window.location.reload();
    });
  }

  // If pcq ca fou un bug dans la page produits, car il n'y a pas le bouton delete
  if (btn_delete) {
    // Bouton delete
    btn_delete.addEventListener("click", () => {
      // On cherche si le produit est déjà dans le panier
      const elementFromPanier = panier.find(
        (element) => element.id == produit.id
      );
      // elementFromPanier est filtré, je le jette et je garde le reste (des produits)
      const updatedPanier = panier.filter(
        (produit) => produit.id != elementFromPanier.id
      );
      // Je met updatedPanier (en string) dans le panier du localStorage
      localStorage.setItem("panier", JSON.stringify(updatedPanier));
      // Reload la page quand supprime un article
      window.location.reload();
    });
  }
}

// Calcul le total du panier
export function calculTotal(panier) {
  let total = 0;
  panier.forEach((element) => {
    total =
      total + parseInt(element.quantity, 10) * parseInt(element.price, 10);
    // parsint pcq il le voit comme un NaN si je le met sur l'html
    // pcq dans localstorage tt est en string
  });
  return total;
}
