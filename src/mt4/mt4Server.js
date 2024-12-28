const net = require('net');
const protocolHandler = require('./protocolHandler');
const logger = require('../utils/logger');

class MT4Server {
  constructor(port = 8000) {
    this.port = port;
    this.server = net.createServer((socket) => this.handleConnection(socket));
    this.clients = new Set();
  }

  start() {
    this.server.listen(this.port, () => {
      logger.info(`MT4 Server listening on port ${this.port}`);
    });

    this.server.on('error', (err) => {
      logger.error('Server error:', err);
    });
  }

  handleConnection(socket) {
    logger.info('New MT4 client connected');
    this.clients.add(socket);

    // Configure socket
    socket.setKeepAlive(true, 30000);
    socket.setNoDelay(true);

    socket.on('data', (data) => {
      try {
        protocolHandler.handlePacket(socket, data);
      } catch (err) {
        logger.error('Error handling MT4 packet:', err);
      }
    });

    socket.on('error', (err) => {
      if (err.code === 'ECONNRESET') {
        logger.info('Client connection reset');
      } else {
        logger.error('Socket error:', err);
      }
      this.clients.delete(socket);
    });

    socket.on('close', () => {
      logger.info('MT4 client disconnected');
      this.clients.delete(socket);
    });

    socket.on('timeout', () => {
      logger.warn('Client connection timeout');
      socket.end();
    });
  }

  broadcastPrices(prices) {
    for (const socket of this.clients) {
      try {
        if (!socket.destroyed) {
          const priceData = Buffer.concat([
            Buffer.from([0x0D]), // Price update command
            Buffer.from(JSON.stringify(prices))
          ]);
          socket.write(priceData);
        }
      } catch (err) {
        logger.error('Error broadcasting prices:', err);
      }
    }
  }
}

module.exports = MT4Server;