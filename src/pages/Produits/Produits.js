import { CardsList } from "../../components/CardsList";
import produits from "../../storage/produits.json";
import { ProduitCard } from "./Partials/ProduitCard";

/**
 * Page de la liste des produits
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Produits = (element) => {
  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Produits</h1>
    </div>
    <div id="produits-list"></div>
    `;

  const produitsList = element.querySelector("#produits-list");

  // Fonction pour afficher les produits
  CardsList(produitsList, produits, ProduitCard, ["name", "description"]);
};
