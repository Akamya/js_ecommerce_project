import { RoleBadge } from "./RoleBadge";

/**
 * @typedef {Object} User
 * @property {number} id - L'identifiant de l'utilisateur.
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} email - L'adresse email de l'utilisateur.
 * @property {string} role - Le rôle de l'utilisateur.
 */

/**
 * Affiche une ligne d'un tableau d'utilisateurs
 *
 * @param {User} user
 * @returns {string} HTML string
 */
export const UserRow = (user) => {
  return `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${RoleBadge(user.role)}</td>
      <td><a class="btn btn-primary btn-sm" href="/utilisateur?id=${
        user.id
      }"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
