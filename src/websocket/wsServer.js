const WebSocket = require('ws');

function createWebSocketServer(port) {
  const wss = new WebSocket.Server({ port });
  
  wss.on('connection', (ws) => {
    console.log('New MT4 client connected');
    
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
  
  return wss;
}

function broadcastPrice(wss, symbol, price) {
  const message = JSON.stringify({
    symbol,
    price: price.toString(),
    timestamp: Date.now()
  });
  
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = {
  createWebSocketServer,
  broadcastPrice
};