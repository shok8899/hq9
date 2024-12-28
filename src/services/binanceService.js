const Binance = require('binance-api-node').default;
const Decimal = require('decimal.js');
const { symbolMapping } = require('../config/symbols');

const binanceClient = Binance();
const prices = new Map();

async function initializePrices() {
  const tickers = await binanceClient.prices();
  Object.entries(tickers).forEach(([symbol, price]) => {
    if (symbolMapping[symbol]) {
      prices.set(symbolMapping[symbol], new Decimal(price));
    }
  });
}

function setupBinanceStreams(broadcastPrice) {
  const symbols = Object.keys(symbolMapping);
  const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`);
  
  binanceClient.ws.trades(symbols, trade => {
    const mtSymbol = symbolMapping[trade.symbol];
    if (mtSymbol) {
      prices.set(mtSymbol, new Decimal(trade.price));
      broadcastPrice(mtSymbol, trade.price);
    }
  });
}

function getPrice(symbol) {
  return prices.get(symbol);
}

module.exports = {
  initializePrices,
  setupBinanceStreams,
  getPrice,
  prices
};