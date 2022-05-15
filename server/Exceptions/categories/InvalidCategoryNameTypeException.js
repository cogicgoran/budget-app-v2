const HttpException = require('../httpException');

class InvalidCategoryNameTypeException extends HttpException {
  constructor() {
    super(400, `Invalid category name`);
  }
}

module.exports = InvalidCategoryNameTypeException;