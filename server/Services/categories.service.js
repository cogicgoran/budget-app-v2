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
    const dataDTO = {
      name: data.name,
      icon_name: data.icon_name.iconName,
      color_main: data.color_main,
      color_border: data.color_border,
    };
    const result = await this.categoryRepository.insertCategory(dataDTO);
    return result;
  };
}

module.exports = new CategoryService(categoryRepository);
