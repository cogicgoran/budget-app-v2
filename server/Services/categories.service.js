const categoryRepository = require('../Repositories/categories.repository');

class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  getAllCategories = async () => {
    const categories = await this.categoryRepository.getAllCategories();
    return categories;
  }

  insertCategory = async (data) => {
    const result = await this.categoryRepository.insertCategory(data);
    return result;
  }
}

module.exports = new CategoryService(categoryRepository);