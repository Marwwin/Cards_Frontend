const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("New client connected");

  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);

    // Echo the message back to the client
    ws.send(JSON.stringify({ type: "GAME_ROUND", hand: ["H2", "D13", "S1"], discardPile: ["S2","D2"]}));
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });

  // Send a welcome message to the client
  ws.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server is running on ws://localhost:8080");
