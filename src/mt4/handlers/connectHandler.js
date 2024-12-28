const { MT4_COMMANDS, MT4_VERSION } = require('../constants');
const logger = require('../../utils/logger');

class ConnectHandler {
  static handleConnect(socket) {
    logger.info('Handling connect request');
    const response = Buffer.alloc(8);
    response[0] = MT4_COMMANDS.CONNECT;
    response[1] = 0x01; // Success
    response[2] = MT4_VERSION.MAJOR;
    response[3] = MT4_VERSION.MINOR;
    response.writeUInt16LE(MT4_VERSION.BUILD, 4);
    response[6] = 0x00; // Reserved
    response[7] = 0x00; // Reserved
    socket.write(response);
  }

  static handleLogin(socket, data) {
    logger.info('Handling login request');
    const response = Buffer.alloc(12);
    response[0] = MT4_COMMANDS.LOGIN;
    response[1] = 0x01; // Success
    response[2] = MT4_VERSION.MAJOR;
    response[3] = MT4_VERSION.MINOR;
    response.writeUInt16LE(MT4_VERSION.BUILD, 4);
    response.writeUInt32LE(Date.now() / 1000, 6);
    response[10] = 0x00; // Reserved
    response[11] = 0x00; // Reserved
    socket.write(response);
  }
}

module.exports = ConnectHandler;