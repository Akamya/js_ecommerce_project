import { loadQuantity, addPanierListeners } from "./helpers";

/**
 * Un composant pour afficher un tableau paginé et filtrable.
 *
 * @param {HTMLElement} element
 * @param {Object[]} items
 * @param {Function} itemTemplate
 * @param {string[]} tableHeadings
 * @param {object[]} panier
 *
 * @returns {void}
 */
export const PanierTable = (
  element,
  items,
  itemTemplate,
  tableHeadings,
  panier
) => {
  const panierItems = panier.map((elementPanier) => {
    return items.find((produit) => {
      return produit.id == elementPanier.id;
    });
  });

  const id = `table-${Math.random().toString(36).slice(2)}`;

  element.innerHTML = `
    <table id="${id}" class="table table-stripped border align-middle">
      <thead>
        <tr>
          ${tableHeadings
            .map((heading) => {
              return `<th scope="col">${heading}</th>`;
            })
            .join("")}
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary btn-sm">Passer la commande</button>
    `;

  const listElement = element.querySelector(`#${id} tbody`);

  // Construit l'html du tableau
  const renderList = (panierItems) => {
    if (panierItems.length === 0) {
      return `
        <td colspan="4" class="text-center">Aucun produit dans la panier</td>
        `;
    }

    return `
      ${panierItems
        .map((produit) => {
          // On regarde la quantité de ce produit dans le panier
          const quantity = loadQuantity(panier, produit);
          // On retourne l'html pour le rendu du produit(une ligne)
          return itemTemplate(produit, quantity);
        })
        .join("")}
    `;
  };

  // On injecte l'html dans la page
  listElement.innerHTML = renderList(panierItems);

  // On met des eventlistener sur les boutons
  panierItems.forEach((produit) => {
    addPanierListeners(produit, panier);
  });
};
