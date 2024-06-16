import { PrimaryButton } from "../components/PrimaryButton";

/**
 * Page de compteur
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Counter = (element) => {
  // on définit une constante pour l'événement de mise à jour du compteur
  const COUNTER_UPDATED_EVENT = "counter-updated";
  let counter = 0;

  const increment = () => {
    counter++;
    element.dispatchEvent(new CustomEvent(COUNTER_UPDATED_EVENT));
  };

  const decrement = () => {
    counter--;
    element.dispatchEvent(new CustomEvent(COUNTER_UPDATED_EVENT));
  };

  element.innerHTML = `
      <h1>Compteur</h1>
      <div id="counter-value" class="mb-3 fs-1">
        ${counter}
      </div>
      <div class="mt-3">
        ${PrimaryButton("-", "button", "decrement-btn")}
        ${PrimaryButton("+", "button", "increment-btn")}
      </div>
    `;

  document.querySelector("#increment-btn").addEventListener("click", increment);
  document.querySelector("#decrement-btn").addEventListener("click", decrement);

  // On utilise un écouteur d'événement pour mettre à jour l'affichage du compteur
  element.addEventListener(COUNTER_UPDATED_EVENT, () => {
    element.querySelector("#counter-value").textContent = counter;
  });
};
