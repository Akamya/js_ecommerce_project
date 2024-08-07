import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";
import { addPanierListeners, loadQuantity } from "./helpers";

/**
 * Un composant pour afficher une liste de cartes paginée et filtrable.
 *
 * @param {HTMLElement} element
 * @param {Object[]} items
 * @param {Function} itemTemplate
 * @param {string[]} searchableFields
 * @param {object[]} panier
 * @returns {void}
 */
export const CardsList = (
  element,
  items,
  itemTemplate,
  searchableFields,
  panier
) => {
  // On récupère le numéro de page et la valeur du champ de recherche dans l'URL
  let currentPage =
    parseInt(new URL(window.location).searchParams.get("page")) || 1;
  let searchInputValue =
    new URL(window.location).searchParams.get("search") || "";

  // On initialise une copie des items pour les filtrer et paginer
  // cela nous permet de ne pas modifier le tableau d'origine
  let filteredItems = items;

  // On génère un identifiant unique pour le composant
  const id = `list-${Math.random().toString(36).slice(2)}`;

  element.innerHTML = `
    <div class="row">
      <div class="col mb-2">
        ${TextInput("search", searchInputValue, "search", "Rechercher...")}
      </div>
       <div class="mb-3 col">
          <select class="form-select" id="input-filtre-sexe">
            <option value="all" selected>Selectionnez un sex</option>
            <option value="1">Chat</option>
            <option value="2">Chatte</option>
          </select>
        </div>
         <div class="mb-3 col">
          <select class="form-select" id="input-filtre-marque">
            <option value="all" selected>Selectionnez une marque</option>
            <option value="1">Crocs</option>
            <option value="2">Nike</option>
            <option value="3">Louboutin</option>
          </select>
        </div>
        <div class="col mb-2">
          ${TextInput("prixMin", searchInputValue, "number", "Prix minimum")}
        </div>
        <div class="col mb-2">
          ${TextInput("prixMax", searchInputValue, "number", "Prix maximum")}
        </div>
        <div class="mb-3 col">
          <select class="form-select" id="input-trie">
            <option value="1">Prix croissant</option>
            <option value="2">Prix décroissant</option>
          </select>
        </div>
    </div>
    <div id="${id}" class="row row-cols-2 row-cols-lg-3">
    </div>
    <div id="pagination"></div>
    `;

  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id}`);
  const paginationElement = element.querySelector("#pagination");

  let selectedSexe = "all";
  let selectedMarque = "all";
  let selectedPrixMin = 0;
  let selectedPrixMax = 1_000_000;
  let selectedTrie = "1";

  // Filtre Sexe
  const filtreSelectSexe = document.querySelector("#input-filtre-sexe");
  filtreSelectSexe.addEventListener("change", () => {
    selectedSexe = filtreSelectSexe.value;
    filterAndPaginate();
  });

  // Filtre Marque
  const filtreSelectMarque = document.querySelector("#input-filtre-marque");
  filtreSelectMarque.addEventListener("change", () => {
    selectedMarque = filtreSelectMarque.value;
    filterAndPaginate();
  });

  // Filtre prix min
  const filtrePrixMin = document.querySelector("#prixMin");
  filtrePrixMin.addEventListener("change", () => {
    selectedPrixMin = filtrePrixMin.value;
    filterAndPaginate();
  });

  // Filtre prix max
  const filtrePrixMax = document.querySelector("#prixMax");
  filtrePrixMax.addEventListener("change", () => {
    selectedPrixMax = filtrePrixMax.value;
    filterAndPaginate();
  });

  // Filtre trie
  const filtreTrie = document.querySelector("#input-trie");
  filtreTrie.addEventListener("change", () => {
    selectedTrie = filtreTrie.value;
    filterAndPaginate();
  });

  // Fonction pour afficher la liste des items
  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `
        <p>Aucun résultat</p>
        `;
    }

    // On passe le template de l'item à la fonction map pour générer une liste de cartes
    return `
      ${filteredItems
        .map((produit) => {
          const quantity = loadQuantity(panier, produit);
          return itemTemplate(produit, quantity);
        })
        .join("")}
    `;
  };

  // Fonction pour filtrer et paginer les items
  const filterAndPaginate = (perPage = 12) => {
    // on filtre une premiere fois sur base de la dropdown de sexe
    if (selectedSexe !== "all") {
      filteredItems = items.filter(
        (item) => item.sexeID === parseInt(selectedSexe, 10)
      );
    } else {
      filteredItems = items;
    }

    // Ensuite on filtre sur base de la dropdown de marque
    if (selectedMarque !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.marqueID === parseInt(selectedMarque, 10)
      );
    }

    // Filtre sur base du prix minimum
    if (selectedPrixMin !== 0) {
      filteredItems = filteredItems.filter(
        (item) => parseInt(item.price, 10) >= selectedPrixMin
      );
    }

    // Filtre sur base du prix maximum
    if (selectedPrixMax !== 1_000_000) {
      filteredItems = filteredItems.filter(
        (item) => parseInt(item.price, 10) <= selectedPrixMax
      );
    }

    //  Filtre sur base du trie
    if (selectedTrie == "1") {
      filteredItems = filteredItems.sort(
        (item1, item2) => parseInt(item1.price) - parseInt(item2.price)
      );
    } else {
      filteredItems = filteredItems.sort(
        (item1, item2) => parseInt(item2.price) - parseInt(item1.price)
      );
    }

    const value = searchInputValue.toLowerCase();
    // On filtre les items en fonction de la valeur du champ de recherche
    // et des champs de recherche spécifiés
    if (value !== "") {
      filteredItems = filteredItems.filter(
        (item) =>
          searchableFields.filter((field) =>
            item[field].toLowerCase().includes(value)
          ).length > 0
      );
    }
    // On calcule l'index de départ et de fin des items à afficher
    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, filteredItems.length);
    // On calcule le nombre de pages
    const pages = Math.ceil(filteredItems.length / perPage);
    // On récupère les items à afficher
    filteredItems = filteredItems.slice(start, end);

    // On met à jour le contenu de la liste et de la pagination
    listElement.innerHTML = renderList(filteredItems);
    paginationElement.innerHTML = Pagination(currentPage, pages);

    const paginationLinks = paginationElement.querySelectorAll("a");
    // On ajoute un écouteur d'événement sur chaque lien de pagination
    const paginationLinkClickHandler = (event) => {
      event.preventDefault();
      // On récupère le numéro de page à partir de l'URL du lien de pagination cliqué
      currentPage = parseInt(
        new URL(event.currentTarget.href).searchParams.get("page")
      );
      // On met à jour l'URL de la page sans recharger la page
      const url = new URL(window.location);
      url.searchParams.set("page", currentPage);
      window.history.pushState({}, "", url);
      // On filtre et on pagine les items
      filterAndPaginate();
    };
    // On ajoute un écouteur d'événement sur chaque lien de pagination
    for (let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].addEventListener("click", paginationLinkClickHandler);
    }

    const cardsLinks = listElement.querySelectorAll("a");
    // On ajoute un écouteur d'événement sur chaque lien de carte
    const cardLinkClickHandler = (event) => {
      event.preventDefault();
      // On met à jour l'URL de la page sans recharger la page
      window.history.pushState({}, "", event.currentTarget.href);
      const headerElement = document.querySelector("header");
      headerElement.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
    };
    // On ajoute un écouteur d'événement sur chaque lien de carte
    for (let i = 0; i < cardsLinks.length; i++) {
      cardsLinks[i].addEventListener("click", cardLinkClickHandler);
    }
    // On ajoute un écouteur d'événement sur chaque bouton de carte
    filteredItems.forEach((element) => addPanierListeners(element, panier));
  };

  // Initialisation de la liste de cartes
  filterAndPaginate();

  // On ajoute un écouteur d'événement sur le champ de recherche
  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    searchInputValue = e.target.value;
    // On revient à la première page lorsqu'on effectue une recherche
    // pour éviter d'afficher une page vide si on est sur une page supérieure
    // au nombre de pages résultant de la recherche
    currentPage = 1;
    // On met à jour l'URL de la page sans recharger la page
    const url = new URL(window.location);
    url.searchParams.set("search", searchInputValue);
    url.searchParams.set("page", currentPage);
    window.history.pushState({}, "", url);
    // On filtre et on pagine les items
    filterAndPaginate();
  });
};
