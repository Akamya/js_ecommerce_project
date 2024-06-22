import marquesJSON from "../../../storage/marques.json";

/**
 * Badge des marques
 *
 * @param {number} marqueID
 * @returns {string} HTML string
 */

export const MarquesBadge = (marqueID) => {
  const marque = marquesJSON.find((marque) => marque.id == marqueID);
  const marqueName = marque.nom;
  const marques = {
    1: "crocs",
    2: "nike",
    3: "louboutin",
  };

  const marqueBadge = marques[marqueID] || "text-bg-secondary";

  return `
    <span class="badge ${marqueBadge}">${marqueName}</span>
    `;
};
