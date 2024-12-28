class Logger {
  debug(message, ...args) {
    console.debug(`[DEBUG] ${message}`, ...args);
  }

  info(message, ...args) {
    console.info(`[INFO] ${message}`, ...args);
  }

  warn(message, ...args) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  error(message, ...args) {
    console.error(`[ERROR] ${message}`, ...args);
  }
}

module.exports = new Logger();