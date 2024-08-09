/*********
 * TYPES *
 *********/

/** @typedef {Array<Card>} CardPile */

/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {CardPile} hand
 * */

/**
 * @typedef {Object} Card
 * @property {CSuit} suit
 * @property {CValue} value
 * */

/**
 *  @typedef {("Hearts"|"Spades"|"Diamonds"|"Clubs")} CSuit
 * */

/**
 * @typedef {("Ace"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"Jack"|"Queen"|"King")} CValue
 * */

/**
 * SOCKET STUFF
 * */

const socket = new WebSocket("ws://localhost:9502");

const output = document.getElementById("output");
const sendButton = document.querySelector("#sendButton");

sendButton.addEventListener("click", () => {
  socket.send(JSON.stringify({msg:"START"}));
});

socket.addEventListener("open", (event) => {
  console.log(`Opened connection to ${event.target.url}`);
});

socket.addEventListener("close", (event) => {
  console.log("Disconnected from WebSocket server");
});

socket.addEventListener("error", (event) => {
  console.error("Error: " + event);
});

socket.addEventListener("message", (event) => {
  handleMessage(event.data);
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
 * @returns {CSuit}
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

const cardUnicodeMap = {
  S1: "🂡",
  S2: "🂢",
  S3: "🂣",
  S4: "🂤",
  S5: "🂥",
  S6: "🂦",
  S7: "🂧",
  S8: "🂨",
  S9: "🂩",
  S10: "🂪",
  S11: "🂫",
  S12: "🂭",
  S13: "🂮",
  H1: "🂱",
  H2: "🂲",
  H3: "🂳",
  H4: "🂴",
  H5: "🂵",
  H6: "🂶",
  H7: "🂷",
  H8: "🂸",
  H9: "🂹",
  H10: "🂺",
  H11: "🂻",
  H12: "🂽",
  H13: "🂾",
  D1: "🃁",
  D2: "🃂",
  D3: "🃃",
  D4: "🃄",
  D5: "🃅",
  D6: "🃆",
  D7: "🃇",
  D8: "🃈",
  D9: "🃉",
  D10: "🃊",
  D11: "🃋",
  D12: "🃍",
  D13: "🃎",
  C1: "🃑",
  C2: "🃒",
  C3: "🃓",
  C4: "🃔",
  C5: "🃕",
  C6: "🃖",
  C7: "🃗",
  C8: "🃘",
  C9: "🃙",
  C10: "🃚",
  C11: "🃛",
  C12: "🃝",
  C13: "🃞",
};
