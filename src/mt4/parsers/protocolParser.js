const { MT4_COMMANDS } = require('../constants');

class ProtocolParser {
  static createConnectResponse() {
    const buffer = Buffer.alloc(8);
    buffer[0] = MT4_COMMANDS.CONNECT;
    buffer[1] = 0x01; // Success
    buffer.writeUInt16LE(0x0100, 2); // Protocol version 1.0
    buffer.writeUInt32LE(0, 4); // Reserved
    return buffer;
  }

  static createMarketInfoResponse() {
    const buffer = Buffer.alloc(8);
    buffer[0] = MT4_COMMANDS.MARKET_INFO;
    buffer[1] = 0x01; // Success
    buffer.writeUInt16LE(0, 2); // Reserved
    buffer.writeUInt32LE(Date.now() / 1000, 4); // Current server time
    return buffer;
  }

  static createTickInfoResponse() {
    const buffer = Buffer.alloc(8);
    buffer[0] = MT4_COMMANDS.TICK_INFO;
    buffer[1] = 0x01; // Success
    buffer.writeUInt16LE(0, 2); // Reserved
    buffer.writeUInt32LE(0, 4); // Tick count
    return buffer;
  }

  static createHistoryInfoResponse() {
    const buffer = Buffer.alloc(8);
    buffer[0] = MT4_COMMANDS.HISTORY_INFO;
    buffer[1] = 0x01; // Success
    buffer.writeUInt16LE(0, 2); // Reserved
    buffer.writeUInt32LE(0, 4); // History count
    return buffer;
  }

  // ... (保留其他现有方法)
}

module.exports = ProtocolParser;