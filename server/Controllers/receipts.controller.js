const express = require("express");
const HttpException = require("../Exceptions/httpException");
const receiptsService = require("../Services/receipts.service");

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
    this.router.put(this.#path, this.#validateReceipt, this.#updateReceipt);
  };

  #updateReceipt = async (req, res) => {
    const result = await this.receiptsService.updateReceipt(req.body);
    return result;
  };

  #insertReceipt = async (req, res) => {
    const result = await this.receiptsService.insertReceipt(req.body);
    return result;
  };

  #validateReceipt = (req, res, next) => {
    const { info, articles } = req.body;
    const date = new Date(info.date);
    if (!articles instanceof Array)
      return next(new Error("InvalidReceiptTypeException")); // create exception
    if (!this.receiptsService.isDateValid(date))
      return next(new Error("InvalidDateException")); // create exception
    if (!this.receiptsService.isReceiptValid(articles))
      return next(new Error("InvalidReceiptException")); // create exception

    req.body.date = date.toISOString().slice(0, -5).replace("T", " ");
    req.body.marketplace = info.marketplace;
    req.body.currency = info.currency;
    req.body.price = articles.reduce(
      (acc, article) => acc + Number(article.price),
      0
    );
    return next();
  };

  #checkArticles = async (req, res, next) => {
    const categories = this.receiptsService.getCategoriesFromArticles(req.body.articles);
    try {
      await this.receiptsService.countInsertedCategories(categories);
      next();
    } catch (error) {
      next(error); 
    }
  };

  #getAllReceipts = async (req, res) => {
    const receipts = await this.receiptsService.getAllReceipts();
    res.json(receipts);
  };

  #getLatestReceipts = async (req, res) => {
    const receipts = await this.receiptsService.getLatestReceipts();
    res.json(receipts);
  };

  #getMonthReceipts = async (req, res) => {
    const receipts = await this.receiptsService.getMonthReceipts();
    res.json(receipts);
  };

  #getReceiptById = async (req, res) => {
    const receiptId = req.params.receiptId;
    const receipt = await this.receiptsService.getReceiptById(receiptId);
    res.json({ receipt });
  };
}

module.exports = new ReceiptsController(receiptsService);
