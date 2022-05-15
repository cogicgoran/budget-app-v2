const HttpException = require('../httpException');

class InvalidCategoryColorMain extends HttpException {
  constructor() {
    super(400, `Invalid category main color`);
  }
}

module.exports = InvalidCategoryColorMain;