const express = require("express");
const receiptsService = require('../Services/receipts.service');

class ReceiptsController {
  #path = `/api/receipts`;
  router = express.Router();

  constructor(receiptsService) {
    this.#initializeRoutes();
    this.receiptsService = receiptsService;
  }

  #initializeRoutes = () => {
    this.router.get(this.#path, this.#getAllReceipts);
    this.router.get(`${this.#path}/latest`, this.#getLatestReceipts);
    this.router.get(`${this.#path}/current-month`, this.#getMonthReceipts);
    this.router.get(`${this.#path}/:id`, this.#getReceiptById);
    this.router.post(
      this.#path,
      this.#validateReceipt,
      this.#checkArticles,
      this.#insertReceipt
    );
    this.router.put(
      this.#path,
      this.#validateReceipt,
      this.#updateReceipt
    );
  };

  #updateReceipt = async (req, res) => {
    const result = await this.receiptsService.updateReceipt(req.body);
    return result;
  }

  #insertReceipt = async (req, res) => {
    const result = await this.receiptsService.insertReceipt(req.body);
    return result;
  };

  #validateReceipt = async (req, res, next) => {
    const { info, articles } = req.body;

    if (!articles instanceof Array)
      return res.status(400).send("Receipt must be array type");

    const date = new Date(info.date);

    const isReceiptValid = articles.every((article) => {
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

    if (!isReceiptValid) return res.status(400).send("INVALID RECEIPT");

    if (date instanceof Date && isFinite(date)) {
      const realdate = date.toISOString().slice(0, -5).replace("T", " ");
      req.body.date = realdate;
      req.body.marketplace = info.marketplace;
      req.body.currency = info.currency;
      req.body.price = articles.reduce(
        (acc, article) => acc + Number(article.price),
        0
      );

      return next();
    }

    return res.status(400).send("INVALID DATE");
  };

  #checkArticles = async (req, res) => {
    const articles = req.body.articles;
    const categories = [];
    articles.forEach((article) => {
      if (!categories.includes(article.category.toUpperCase())) {
        categories.push(article.category.toUpperCase());
      }
    });
    return countInsertedCategories(res, next, categories, categories.length);
  };

  #getAllReceipts = async (req, res) => {
    const receipts = await this.receiptsService.getAllReceipts();
    return receipts;
  };

  #getLatestReceipts = async (req, res) => {
    const receipts = await this.receiptsService.getLatestReceipts();
    return receipts;
  };

  #getMonthReceipts = async (req, res) => {
    const receipts = await this.receiptsService.getMonthReceipts();
    return receipts;
  };

  #getReceiptById = async (req, res) => {
    const receiptId = req.params.receiptId;
    const receipt = await this.receiptsService.getReceiptById(receiptId);
    return receipt;
  };
}

module.exports = new ReceiptsController(receiptsService);
