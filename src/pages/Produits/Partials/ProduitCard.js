import { SexeBadge } from "./SexeBadge";
import { MarquesBadge } from "./MarquesBadge";

/**
 * @typedef {Object} Produit
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} description - L'adresse email de l'utilisateur.
 * @property {string} categorie - La catégorie du produit.
 */

/**
 * Affiche une carte d'utilisateur
 *
 * @param {Produit} produit
 * @returns {string} HTML string
 */
export const ProduitCard = (produit) => {
  return `
    <div class="col p-2">
      <a class="card produit-link" href="/produit?id=${produit.id}">
        <div class="card-body">
          <img src="${produit.image}" class="card-image">
          <h2 class="card-title">${produit.name}</h2>
          <p class="card-text">${produit.description}</p>
          ${SexeBadge(produit.sexeID)}
          ${MarquesBadge(produit.marqueID)}
          <p class="w-100 text-end">${produit.price}</p>
          
        </div>
      </a>
    </div>
    `;
};
