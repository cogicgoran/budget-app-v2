const receiptsRepository = require("../Repositories/receipts.repository");

class ReceiptsService {
  constructor(receiptsRepository) {
    this.receiptsRepository = receiptsRepository;
  }

  getAllReceipts = async () => {
    const receipts = await this.receiptsRepository.getAllReceipts();
    return receipts;
  };

  getLatestReceipts = async () => {
    const receipts = await this.receiptsRepository.getLatestReceipts();
    return receipts;
  };

  getMonthReceipts = async () => {
    const receipts = await this.receiptsRepository.getMonthReceipts();
    return receipts;
  };

  getReceiptById = async (id) => {
    const receipt = await this.receiptsRepository.getReceiptById(id);
    return receipt;
  };

  insertReceipt = async (body) => {
    const result = await this.receiptsRepository.insertReceipt(body);
    return result;
  };

  updateReceipt = async (body) => {
    const jsonString = JSON.stringify(body.receipt);
    const result = await this.receiptsRepository.updateReceipt(
      body,
      jsonString
    );
    return result;
  };

  countInsertedCategories = async (categories) => {
    const result = await this.receiptsRepository.countInsertedCategories(
      categories
    );
    return result;
  };

  getCategoriesFromArticles = (articles) => {
    const categories = [];
    articles.forEach((article) => {
      if (!categories.includes(article.category.toUpperCase())) {
        categories.push(article.category.toUpperCase());
      }
    });
    return categories;
  }

  isReceiptValid = (articles) => {
    return articles.every((article) => {
      const articleName = article.name.trim();
      const articleCategory = article.category.trim();

      if (
        articleName != "" &&
        articleName.length > 0 &&
        articleCategory != "" &&
        articleCategory.length > 0
      )
        return true;
      return false;
    });
  };

  isDateValid = (date) => {
    return date instanceof Date && isFinite(date);
  }

}

module.exports = new ReceiptsService(receiptsRepository);
