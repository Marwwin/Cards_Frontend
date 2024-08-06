/**
 * SOCKET STUFF
 * */

const socket = new WebSocket("ws://localhost:8080");

const output = document.getElementById("output");
const sendButton = document.querySelector("#sendButton");

sendButton.addEventListener("click", () => {
  socket.send("ping pong");
});

socket.addEventListener("open", (event) => {
  console.log(`Opened connection to ${event.target.url}`);
});

socket.addEventListener("message", (event) => {
  handleMessage(event.data);
});

socket.addEventListener("close", (event) => {
  console.log("Disconnected from WebSocket server");
});

socket.addEventListener("error", (event) => {
  console.error("Error: " + event);
});

function handleMessage(message) {
  if (message === null) {
    return;
  }

  messageLogger(message);
  const json = JSON.parse(message);
  const container = document.querySelector("#cards");
  if (json.type === "GAME_ROUND") {
    for (let card of json.hand) {
      const cardElement = document.createElement("card-element");
      cardElement.card = card;
      container.appendChild(cardElement);
    }
  }
}

function messageLogger(message) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  output.appendChild(messageElement);
}

/**
 * CARD STUFF
 * */

/**
 * CARD TYPES
 * */

/**
 * @typedef {Object} Card
 * @property {string} suit
 * @property {string} value
 * */

/**
 * CARD COMPONENT
 * */

const cardTemplate = document.createElement("template");

cardTemplate.innerHTML = `
    <style></style>
    <div class="card">
        <p>Suit: <span id="suit"></span></p>
        <p>Value: <span id="value"></span></p>
    </div>
`;

/**
 * The HTML component of a Card
 * @extends {HTMLElement}
 * */
class Card extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(cardTemplate.content.cloneNode(true));
    this.suitElement = shadow.getElementById("suit");
    this.valueElement = shadow.getElementById("value");
  }
  /**
   * @param {string} cardStr
   */
  set card(cardStr) {
    const c = parseCard(cardStr);
    this.suitElement.textContent = c.suit;
    this.valueElement.textContent = c.value;
  }
}
customElements.define("card-element", Card);

/**
 * CARD UTIL FUNCTIONS
 * */

/**
 * @param {string} card
 * @return {Card}
 * */

function parseCard(card) {
  return { suit: parseSuit(card), value: parseValue(card) };
}

/**
 * @param {string} card
 * @returns {string}
 * */

function parseSuit(card) {
  if (card[0] === "H") {
    return "Hearts";
  }
  if (card[0] === "S") {
    return "Spades";
  }
  if (card[0] === "C") {
    return "Clubs";
  }
  if (card[0] === "D") {
    return "Diamonds";
  }
}

/**
 * @param {string} card
 * @returns {string}
 * */

function parseValue(card) {
  const val = card.slice(1);
  if (val === "1") {
    return "Ace";
  }
  if (val === "11") {
    return "Jack";
  }
  if (val === "12") {
    return "Queen";
  }
  if (val === "13") {
    return "King";
  }
  if (val === "69") {
    return "Joker";
  }
  return val;
}
