const HttpException = require('./httpException');

class InvalidArticleCategoryException extends HttpException {
  constructor() {
    super(400, 'Invalid or missing categories');
  }
}

module.exports = InvalidArticleCategoryException;