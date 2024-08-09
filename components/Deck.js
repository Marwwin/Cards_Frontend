import { BaseComponent } from "./BaseComponent";

export const DECK_TYPES = {
  DISCARD: "DISCARD",
  STANDARD: "STANDARD",
};

class Deck extends BaseComponent {
  #type;
  #cards;

  constructor() {
    super();
  }
  init({ type, cards }) {
    this.#type = type;
    this.#cards = cards;
  }
}

customElements.define("deck-component", Deck);
