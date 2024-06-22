import produits from "../../storage/produits.json";
import { SexeBadge } from "./Partials/SexeBadge";
import { MarquesBadge } from "./Partials/MarquesBadge";

/**
 * Page des détails d'un utilisateur
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Produit = (element) => {
  // on récupère l'identifiant de l'utilisateur depuis l'URL
  const url = new URL(window.location.href);
  const produitId = parseInt(url.searchParams.get("id"));
  // on récupère l'utilisateur correspondant à l'identifiant
  const produit = produits.find((produit) => produit.id === produitId);

  // si l'utilisateur n'existe pas, on affiche un message d'erreur
  if (!produit) {
    element.innerHTML = `
      <h1>Utilisateur non trouvé</h1>
      <p>L'utilisateur avec l'identifiant ${produitId} n'existe pas.</p>
      `;
    return;
  }

  element.innerHTML = `
    <img src="${produit.image}" class="card-image">
    <h1>${produit.name}</h1>
    <p>${produit.description}</p>
    ${SexeBadge(produit.sexeID)}
    ${MarquesBadge(produit.marqueID)}
    <p class="w-25 text-end">${produit.price}</p>
    `;
};
