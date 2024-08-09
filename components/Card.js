/**************
 * CARD STUFF *
 **************/

/**
 * @typedef {Object} Card
 * @property {CSuit} suit
 * @property {CValue} value
 * */

/**
 * Card component
 * @extends {HTMLElement}
 * */
class Card extends HTMLElement {
  #shadow;
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });

    //  this.suitElement = shadow.getElementById("suit");
    this.valueElement = shadow.getElementById("value");
  }
  connectedCallback() {
    const cardHTMLTemplate = document.createElement("template");
    cardHTMLTemplate.innerHTML = `
    <style>
      .card{
        font-size: 30px; 
        color: black;
        margin: 5px;
    }
    </style>
    <div class="card">
        <span id="value"></span>
    </div>
`;

    this.#shadow.appendChild(cardHTMLTemplate.content.cloneNode(true));
    cardHTMLTemplate;
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }

  /**
   * @param {string} cardStr
   */
  set card(cardStr) {
    const c = parseCard(cardStr);
    // this.suitElement.textContent = c.suit;
    this.valueElement.textContent = cardUnicodeMap[cardStr];

    if (c.suit === "Hearts" || c.suit === "Diamonds") {
      this.shadowRoot.querySelector(".card").style.color = "red";
    }
  }
}
customElements.define("card-element", Card);
