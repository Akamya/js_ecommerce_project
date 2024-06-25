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
 * @param {Number} quantity
 * @returns {string} HTML string
 */
export const ProduitCard = (produit, quantity) => {
  return `
    <div class="col p-2">
      <div class="card produit-link">

        <a href="/produit?id=${produit.id}">
          <div class="card-body">
              <img src="${produit.image}" class="card-image">
              <h2 class="card-title">${produit.name}</h2>
              <p class="card-text">${produit.description}</p>
              ${SexeBadge(produit.sexeID)}
              ${MarquesBadge(produit.marqueID)}
              <p class="w-100 text-end" style="font-weight: bold;">${
                produit.price
              }</p>
          </div>
        </a>

        <div>
        <div class="btnsCenter">
        <button type="button" class="btn btn-primary btn-sm" id="btn_moins_${
          produit.id
        }">-</button>
          <input class="inputCenter" type="number" value="${quantity}" min="0" oninput="validity.valid||(value='');" id="counter_${
    produit.id
  }" style="width: 2em" >
          <button type="button" class="btn btn-primary btn-sm" id="btn_plus_${
            produit.id
          }">+</button>
        </div>
          
          
          <!-- 
          Pour empecher les valeurs négatives quand on rentre nous même le chiffre dans input
          https://stackoverflow.com/questions/19233415/how-to-make-type-number-to-positive-numbers-only -->

          <div class="btnsCenter">
          <button type="button" class="btn btn-primary btn-sm" id="btn_ajout_${
            produit.id
          }">Ajouter au panier</button>
        </div>
        </div>

      </div>
    </div>
    `;
};
