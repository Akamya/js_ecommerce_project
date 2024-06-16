import users from "../../storage/users.json";
import { RoleBadge } from "./Partials/RoleBadge";

/**
 * Page des détails d'un utilisateur
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const User = (element) => {
  // on récupère l'identifiant de l'utilisateur depuis l'URL
  const url = new URL(window.location.href);
  const userId = parseInt(url.searchParams.get("id"));
  // on récupère l'utilisateur correspondant à l'identifiant
  const user = users.find((user) => user.id === userId);

  // si l'utilisateur n'existe pas, on affiche un message d'erreur
  if (!user) {
    element.innerHTML = `
      <h1>Utilisateur non trouvé</h1>
      <p>L'utilisateur avec l'identifiant ${userId} n'existe pas.</p>
      `;
    return;
  }

  element.innerHTML = `
    <h1>${user.name}</h1>
    <p>${user.email}</p>
    ${RoleBadge(user.role)}
    `;
};
