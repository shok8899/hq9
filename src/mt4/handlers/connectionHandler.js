const ProtocolParser = require('../parsers/protocolParser');
const logger = require('../../utils/logger');

class ConnectionHandler {
  static handleConnect(socket) {
    try {
      logger.info('Handling initial connect');
      const response = ProtocolParser.createConnectResponse();
      socket.write(response);
    } catch (err) {
      logger.error('Connect handler error:', err);
    }
  }

  static handleDisconnect(socket) {
    try {
      logger.info('Client requested disconnect');
      socket.end();
    } catch (err) {
      logger.error('Disconnect handler error:', err);
    }
  }
}

module.exports = ConnectionHandler;