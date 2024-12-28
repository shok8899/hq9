class ProtocolParser {
  static parseLoginRequest(data) {
    if (data.length < 4) return null;
    return {
      command: data[0],
      version: data[1],
      account: data.readUInt32LE(2)
    };
  }

  static createConnectResponse() {
    const buffer = Buffer.alloc(4);
    buffer[0] = 0x00; // CONNECT response
    buffer[1] = 0x01; // Success
    buffer.writeUInt16LE(0, 2); // Protocol version
    return buffer;
  }

  static createLoginResponse(success = true) {
    const buffer = Buffer.alloc(4);
    buffer[0] = 0x02; // LOGIN_RESPONSE
    buffer[1] = success ? 0x01 : 0x00;
    buffer[2] = 0x00;
    buffer[3] = 0x00;
    return buffer;
  }

  static createPongResponse() {
    const buffer = Buffer.alloc(4);
    buffer[0] = 0x06; // PONG
    buffer.writeUInt16LE(0, 1);
    buffer[3] = 0x00;
    return buffer;
  }

  static createSymbolListResponse(symbols) {
    const symbolList = symbols.join(',');
    return Buffer.concat([
      Buffer.from([0x0B]), // SYMBOL_LIST_RESPONSE
      Buffer.from([0x01]), // Success
      Buffer.from([0x00, 0x00]), // Reserved
      Buffer.from(symbolList)
    ]);
  }

  static createPriceResponse() {
    const buffer = Buffer.alloc(4);
    buffer[0] = 0x0D; // PRICE_RESPONSE
    buffer[1] = 0x01; // Success
    buffer[2] = 0x00;
    buffer[3] = 0x00;
    return buffer;
  }

  static createTradeResponse(allowed = false) {
    const buffer = Buffer.alloc(4);
    buffer[0] = 0x45; // TRADE_RESPONSE
    buffer[1] = allowed ? 0x01 : 0x00;
    buffer[2] = 0x00;
    buffer[3] = 0x00;
    return buffer;
  }

  static createConfigResponse() {
    const buffer = Buffer.alloc(8);
    buffer[0] = 0x25; // CONFIG_RESPONSE
    buffer[1] = 0x01; // Success
    buffer.writeUInt16LE(1, 2); // Config version
    buffer.writeUInt32LE(0, 4); // Additional config data
    return buffer;
  }
}

module.exports = ProtocolParser;