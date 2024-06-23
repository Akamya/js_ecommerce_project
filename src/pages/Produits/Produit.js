import produits from "../../storage/produits.json";
import { SexeBadge } from "./Partials/SexeBadge";
import { MarquesBadge } from "./Partials/MarquesBadge";
import {
  addPanierListeners,
  loadPanier,
  loadQuantity,
} from "../../components/helpers";

/**
 * Page des détails d'un produit
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Produit = (element) => {
  const panier = loadPanier();

  // on récupère l'identifiant de le produit depuis l'URL
  const url = new URL(window.location.href);
  const produitId = parseInt(url.searchParams.get("id"));
  // on récupère le produit correspondant à l'identifiant
  const produit = produits.find((produit) => produit.id === produitId);

  // si le produit n'existe pas, on affiche un message d'erreur
  if (!produit) {
    element.innerHTML = `
      <h1>Produit non trouvé</h1>
      <p>Le produit avec l'identifiant ${produitId} n'existe pas.</p>
      `;
    return;
  }

  const quantity = loadQuantity(panier, produit);

  element.innerHTML = `
    <img src="${produit.image}" class="card-image">
    <h1>${produit.name}</h1>
    <p>${produit.description}</p>
    ${SexeBadge(produit.sexeID)}
    ${MarquesBadge(produit.marqueID)}
    <p class="w-25 text-end">${produit.price}</p>

    <button type="button" class="btn btn-primary btn-sm" 
      id="btn_moins_${produit.id}">-</button>
    
    <!-- Pour empecher les valeurs négatives quand on rentre nous même le chiffre dans input https://stackoverflow.com/questions/19233415/how-to-make-type-number-to-positive-numbers-only -->

    <input type="number" value="${quantity}" min="0" oninput="validity.valid||(value='');"
      id="counter_${produit.id}" style="width: 2em" >
    <button type="button" class="btn btn-primary btn-sm" 
      id="btn_plus_${produit.id}">+</button>
    <button type="button" class="btn btn-primary btn-sm" 
      id="btn_ajout_${produit.id}">Ajouter au panier</button>
    `;

  addPanierListeners(produit, panier);
};
