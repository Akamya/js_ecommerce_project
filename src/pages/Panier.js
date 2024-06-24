import { PanierTable } from "../components/PanierTable";
import produits from "../storage/produits.json";
import { loadPanier } from "../components/helpers";
import { ProduitRow } from "./Produits/Partials/ProduitRow";

/**
 * Page d'accueil
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Panier = (element) => {
  element.innerHTML = `
      <div class="d-flex justify-content-between">
        <h1>Panier</h1>
      </div>
      <div id="produits-list"></div>
      
      `;

  const panier = loadPanier();

  const produitsList = element.querySelector("#produits-list");

  // Fonction pour afficher les produits
  PanierTable(
    produitsList,
    produits,
    ProduitRow,
    ["Produit", "Quantités", "Prix"],
    panier
  );
};
