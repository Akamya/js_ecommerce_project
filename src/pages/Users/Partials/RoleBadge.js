/**
 * Badge de rôle utilisateur
 *
 * @param {string} role
 * @returns {string} HTML string
 */
export const RoleBadge = (role) => {
  const roles = {
    admin: "text-bg-danger",
    user: "text-bg-primary",
  };

  const roleBadge = roles[role] || "text-bg-secondary";

  return `
    <span class="badge ${roleBadge}">${role}</span>
    `;
};
