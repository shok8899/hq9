const { prices } = require('./binanceService');

class PriceService {
  constructor() {
    this.lastBroadcast = new Map();
  }

  // Get formatted prices for MT4
  getFormattedPrices() {
    const formattedPrices = {};
    prices.forEach((price, symbol) => {
      formattedPrices[symbol] = {
        bid: price.toString(),
        ask: price.toString(), // In real scenario, add spread
        timestamp: Date.now()
      };
    });
    return formattedPrices;
  }

  // Check if price change is significant enough to broadcast
  shouldBroadcast(symbol, newPrice) {
    const lastPrice = this.lastBroadcast.get(symbol);
    if (!lastPrice) return true;

    // Broadcast if price changed by more than 0.1%
    const change = Math.abs(newPrice - lastPrice) / lastPrice;
    return change > 0.001;
  }

  updateLastBroadcast(symbol, price) {
    this.lastBroadcast.set(symbol, price);
  }
}

module.exports = new PriceService();