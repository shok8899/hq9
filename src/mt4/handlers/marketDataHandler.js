const ProtocolParser = require('../parsers/protocolParser');
const { symbolMapping } = require('../../config/symbols');
const logger = require('../../utils/logger');

class MarketDataHandler {
  static handleSymbolList(socket) {
    try {
      const symbols = Object.values(symbolMapping);
      const response = ProtocolParser.createSymbolListResponse(symbols);
      socket.write(response);
    } catch (err) {
      logger.error('Symbol list handler error:', err);
    }
  }

  static handleMarketInfo(socket) {
    try {
      const response = ProtocolParser.createMarketInfoResponse();
      socket.write(response);
    } catch (err) {
      logger.error('Market info handler error:', err);
    }
  }

  static handleTickInfo(socket) {
    try {
      const response = ProtocolParser.createTickInfoResponse();
      socket.write(response);
    } catch (err) {
      logger.error('Tick info handler error:', err);
    }
  }

  static handleHistoryInfo(socket) {
    try {
      const response = ProtocolParser.createHistoryInfoResponse();
      socket.write(response);
    } catch (err) {
      logger.error('History info handler error:', err);
    }
  }
}

module.exports = MarketDataHandler;