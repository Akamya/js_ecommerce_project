import { SexeBadge } from "./SexeBadge";
import { MarquesBadge } from "./MarquesBadge";
import { addPanierListeners } from "../../../components/helpers";
import produits from "../../../storage/produits.json";

/**
 * Affiche une ligne d'un tableau d'utilisateurs
 *
 * @param {Object} produit
 * @param {number} quantity
 * @returns {string} HTML string
 */
export const ProduitRow = (produit, quantity) => {
  return `
    <tr>
      <td> <img src="${produit.image}"></td>
      <td>${produit.name}</td>
      <td> 
        <button type="button" class="btn btn-primary btn-sm" id="btn_moins_${produit.id}">-</button> 
        <input type="number" value="${quantity}" min="0" oninput="validity.valid||(value='');"
          id="counter_${produit.id}" style="width: 2em" >
        <button type="button" class="btn btn-primary btn-sm" id="btn_plus_${produit.id}">+</button> <button type="button" class="btn btn-primary btn-sm" 
          id="btn_ajout_${produit.id}">Valider</button></td>
      <td>${produit.price} </td>
      <td>
        <button type="button" class="btn btn-danger btn-sm" id="btn_delete_${produit.id}">Supprimer</button>
      </td>
    </tr>
    `;
};
