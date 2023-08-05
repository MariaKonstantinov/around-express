class NotFoundError extends Error {
  constructor(message, ...args) {
    super(args);
    this.status = 404;
    this.message = message;
  }
}

module.exports = NotFoundError;
