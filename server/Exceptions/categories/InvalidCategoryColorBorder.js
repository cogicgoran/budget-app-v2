const HttpException = require('../httpException');

class InvalidCategoryColorBorder extends HttpException {
  constructor() {
    super(400, `Invalid category border color`);
  }
}

module.exports = InvalidCategoryColorBorder;