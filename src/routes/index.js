const express = require('express');
const router = express.Router();
const { symbolMapping } = require('../config/symbols');
const { getPrice } = require('../services/binanceService');

// Home page
router.get('/', (req, res) => {
  res.json({
    name: 'Crypto MT4 Market Data Server',
    version: '1.0.0',
    endpoints: {
      symbols: '/symbols',
      price: '/price/:symbol',
      websocket: 'ws://[server-ip]:8001'
    },
    supportedSymbols: Object.values(symbolMapping)
  });
});

// List all available symbols
router.get('/symbols', (req, res) => {
  res.json(Object.values(symbolMapping));
});

// Get price for specific symbol
router.get('/price/:symbol', (req, res) => {
  const price = getPrice(req.params.symbol);
  if (price) {
    res.json({
      symbol: req.params.symbol,
      price: price.toString(),
      timestamp: Date.now()
    });
  } else {
    res.status(404).json({ error: 'Symbol not found' });
  }
});

module.exports = router;