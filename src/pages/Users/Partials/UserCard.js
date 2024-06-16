import { RoleBadge } from "./RoleBadge";

/**
 * @typedef {Object} User
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} email - L'adresse email de l'utilisateur.
 * @property {string} role - Le rôle de l'utilisateur.
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
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">${user.email}</p>
          ${RoleBadge(user.role)}
        </div>
      </a>
    </div>
    `;
};
