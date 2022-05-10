class HttpException extends Error {
  status;
  message;

  constructor(status, message) {
    super(message);
    this.status = status || 500;
    this.message = message || 'Internal Server Error';
  }
}

module.exports = HttpException;