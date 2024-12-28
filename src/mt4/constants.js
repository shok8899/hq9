// MT4 Protocol Constants
exports.MT4_COMMANDS = {
  // Connection commands
  CONNECT: 0x00,
  LOGIN: 0x02,
  LOGOUT: 0x04,
  VERSION: 0x07,
  
  // Market data commands
  SYMBOL_LIST: 0x0A,
  PRICE_REQUEST: 0x0C,
  TICK_INFO: 0x81,
  MARKET_INFO: 0x83,
  
  // Account commands
  ACCOUNT_INFO: 0x46,
  TRADE_INFO: 0x48,
  SERVER_TIME: 0x4E,
  
  // Additional commands
  PING: 0x51,
  CONFIG: 0x75,
  HISTORY: 0x8F
};

exports.MT4_VERSION = {
  MAJOR: 0x04,
  MINOR: 0x00,
  BUILD: 0x0001
};