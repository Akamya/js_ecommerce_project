import sexeJSON from "../../../storage/sexe.json";

/**
 * Badge de sexe
 *
 * @param {number} sexeID
 * @returns {string} HTML string
 */

export const SexeBadge = (sexeID) => {
  const sexe = sexeJSON.find((sex) => sex.id == sexeID);
  const sexeName = sexe.nom;
  const sexes = {
    1: "text-bg-primary",
    2: "pink",
  };

  const sexeBadge = sexes[sexeID] || "text-bg-secondary";

  return `
    <span class="badge ${sexeBadge}">${sexeName}</span>
    `;
};
