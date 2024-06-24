import { SexeBadge } from "./SexeBadge";
import { MarquesBadge } from "./MarquesBadge";

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
      <td>${produit.name}</td>
      <td>${produit.price}</td>
      <td>${SexeBadge(produit.sexeID)}</td>
      <td><a class="btn btn-primary btn-sm" href="/produit?id=${
        produit.id
      }"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
