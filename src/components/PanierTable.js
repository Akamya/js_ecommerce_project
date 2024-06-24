import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";
import { loadQuantity } from "./helpers";

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
  const filteredItems = panier.map((elementPanier) => {
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
    `;

  const listElement = element.querySelector(`#${id} tbody`);

  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `
        <td colspan="4" class="text-center">Aucun produit dans la panier</td>
        `;
    }

    return `
      ${filteredItems
        .map((produit) => {
          const quantity = loadQuantity(panier, produit);
          return itemTemplate(produit, quantity);
        })
        .join("")}
    `;
  };

  listElement.innerHTML = renderList(filteredItems);
};
