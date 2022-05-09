const categoryRepository = require('../Repositories/categories.repository');

class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  getAllCategories = async () => {
    const categories = await this.categoryRepository.getAllCategories();
    return categories;
  }

  insertCategory = async (body) => {
    const result = await this.categoryRepository.insertCategory(body);
    return result;
  }
}

module.exports = new CategoryService(categoryRepository);