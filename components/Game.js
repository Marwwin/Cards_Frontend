"use strict";
/**************
 * GAME STUFF *
 **************/

import { BaseComponent } from "./BaseComponent";
import { DECK_TYPES } from "./Deck";

const GAME_TYPES = {
  PASKAHOUSU: "PASKAHOUSU",
};

class Game extends BaseComponent {
  /** @type {WebSocket}*/
  #socket;
  /** @type {HTMLElement} **/
  #players;
  /** @type {HTMLElement}**/
  #deck;
  /** @type {CardPile}*/
  #discardPile;
  /** @type {string}*/
  #gameType;
  /** @type {HTMLElement}*/
  #messageBoard;
  /** @type {HTMLElement}*/
  #header;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.#header = document.querySelector("#header");
  }
  connectedCallback() {
    this.connectedCallbackLogging();
    const gameTemplate = document.createElement("template");
    gameTemplate.innerHTML = `
    <style></style>
    <div>
        <h2 id="header">This is the game area</h2>
    </div>
`;
    this.shadow.appendChild(gameTemplate.content.cloneNode(true));
  }

  /** Initializes the game **/
  init(state) {
    this.#gameType = state.type;

    this.#players = document.createElement("div");
    this.#players.classList.add("players");

    if (this.#gameType === GAME_TYPES.PASKAHOUSU) {
      for (let player of state.players) {
        const playerElement = document.createElement("player-element");
        playerElement.init(player);
        this.#players.appendChild(playerElement);
      }
    }

    this.#deck = document.createElement("deck-component");
    this.#deck.init(state.deck);

    this.#discardPile = document.createElement("deck-component");
    this.#discardPile.init({ type: DECK_TYPES.DISCARD, cards: [] });
  }
  reset() {}
  round() {}
}

customElements.define("game-element", Game);
