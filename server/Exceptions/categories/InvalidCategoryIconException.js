const HttpException = require('../httpException');

class InvalidCategoryIconException extends HttpException {
  constructor() {
    super(400, `Invalid category name`);
  }
}

module.exports = InvalidCategoryIconException;