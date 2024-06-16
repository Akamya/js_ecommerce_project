import { RoleBadge } from "./RoleBadge";

/**
 * @typedef {Object} User
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} description - L'adresse email de l'utilisateur.
 * @property {string} price - Le rôle de l'utilisateur.
 */

/**
 * Affiche une carte d'utilisateur
 *
 * @param {User} user
 * @returns {string} HTML string
 */
export const UserCard = (user) => {
  return `
    <div class="col p-2">
      <a class="card user-link" href="/utilisateur?id=${user.id}">
        <div class="card-body">
          <img src="${user.image}" class="card-image">
          <h2 class="card-title">${user.name}</h2>
          <p class="card-text">${user.description}</p>
          ${RoleBadge(user.price)}
        </div>
      </a>
    </div>
    `;
};
