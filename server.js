const express = require('express');
const { createWebSocketServer, broadcastPrice } = require('./src/websocket/wsServer');
const { initializePrices, setupBinanceStreams } = require('./src/services/binanceService');
const MT4Server = require('./src/mt4/mt4Server');
const priceService = require('./src/services/priceService');
const routes = require('./src/routes');

const app = express();
const wss = createWebSocketServer(8001);
const mt4Server = new MT4Server(8000);

// Use routes
app.use('/', routes);

// Initialize and start server
async function startServer() {
  try {
    await initializePrices();
    
    // Setup price broadcasts
    setupBinanceStreams((symbol, price) => {
      // Broadcast to WebSocket clients
      broadcastPrice(wss, symbol, price);
      
      // Broadcast to MT4 clients if price change is significant
      if (priceService.shouldBroadcast(symbol, price)) {
        mt4Server.broadcastPrices(priceService.getFormattedPrices());
        priceService.updateLastBroadcast(symbol, price);
      }
    });
    
    // Start MT4 Server
    mt4Server.start();
    
    const PORT = 8002; // Change HTTP API port to avoid conflict
    app.listen(PORT, () => {
      console.log(`HTTP API running on port ${PORT}`);
      console.log(`WebSocket server running on port 8001`);
      console.log(`MT4 server running on port 8000`);
    });
  } catch (error) {
    console.error('Server initialization failed:', error);
    process.exit(1);
  }
}

startServer();