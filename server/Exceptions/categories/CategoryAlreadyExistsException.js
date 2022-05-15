const HttpException = require('../httpException');

class CategoryAlreadyExistsException extends HttpException {
  constructor(categoryName) {
    super(400, `Category with name '${categoryName}' already exists`);
  }
}

module.exports = CategoryAlreadyExistsException;