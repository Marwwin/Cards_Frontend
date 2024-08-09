/****************
 * PLAYER STUFF *
 ****************/

import { BaseComponent } from "./BaseComponent";

class Player extends BaseComponent {
  #id;
  /** @type {CardPile}*/
  #hand;
  /** @type {CardPile}*/
  #cardsOnTable;
  /** @type {CardPile}*/
  #hiddenCards;
  #shadow;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.connectedCallbackLogging();

    const playerTemplate = document.createElement("template");
    playerTemplate.innerHTML = `
  <style></style>
  <div>This is player</div>
`;
    this.#shadow.appendChild(playerTemplate.content.cloneNode(true));
  }
  init({id, hand, cardsOnTable}){
    this.#id = id;
    this.#hand = 
  }
}

customElements.define("player-element", Player);
