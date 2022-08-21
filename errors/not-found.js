class NotFound extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = NotFound;
