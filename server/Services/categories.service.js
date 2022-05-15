const categoryRepository = require("../Repositories/categories.repository");

class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  getAllCategories = async () => {
    const categories = await this.categoryRepository.getAllCategories();
    return categories;
  };

  insertCategory = async (data) => {
    const result = await this.categoryRepository.insertCategory(data);
    return result;
  };

  validateCategory = async (categoryDO) => {
    const existingCategory = await this.categoryRepository.getCategoryByName(categoryDO.name);
    if (existingCategory.length !== 0) throw new Error(`Category with name '${categoryDO.name}' already exists`)
  }
}

module.exports = new CategoryService(categoryRepository);
