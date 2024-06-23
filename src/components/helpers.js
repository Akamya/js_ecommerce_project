export function loadPanier() {
  const existingPanier = localStorage.getItem("panier");
  let panier = [];

  if (existingPanier) {
    panier = JSON.parse(existingPanier);
  }
  return panier;
}

export function loadQuantity(panier, produit) {
  const produitDansPanier = panier.find((product) => product.id == produit.id);
  let quantity = 0;
  if (produitDansPanier) {
    quantity = produitDansPanier.quantity;
  }
  return quantity;
}

export function addPanierListeners(produit, panier) {
  //Ajouter les eventListeners correctement
  const btn_moins = document.querySelector(`#btn_moins_${produit.id}`);
  const btn_plus = document.querySelector(`#btn_plus_${produit.id}`);
  const btn_ajout = document.querySelector(`#btn_ajout_${produit.id}`);
  const counter = document.querySelector(`#counter_${produit.id}`);

  //Pour empecher les valeurs négatives quand on rentre nous même le chiffre dans input https://stackoverflow.com/questions/19233415/how-to-make-type-number-to-positive-numbers-only
  btn_moins.addEventListener("click", () => {
    if (parseInt(counter.value, 10) > 0) {
      counter.value = parseInt(counter.value, 10) - 1;
    }
  });

  btn_plus.addEventListener("click", () => {
    counter.value = parseInt(counter.value, 10) + 1;
  });

  btn_ajout.addEventListener("click", () => {
    const elementFromPanier = panier.find(
      (element) => element.id == produit.id
    );
    if (elementFromPanier) {
      elementFromPanier.quantity = counter.value;
    } else {
      panier.push({ id: produit.id, quantity: counter.value });
    }

    localStorage.setItem("panier", JSON.stringify(panier));
  });
}
