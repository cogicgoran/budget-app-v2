const express = require("express");
const currencyService = require('../Services/currencies.service');

class CurrencyController {
  #path = `/api/currencies`;
  router = express.Router();

  constructor(currencyService) {
    this.#initializeRoutes();
    this.currencyService = currencyService;
  }

  #initializeRoutes = () => {
    this.router.get(this.#path, this.#getAllCurrencies);
    this.router.post(this.#path, this.#validateCurrency, this.#insertCurrency);
  };

  #getAllCurrencies = async (req, res) => {
    const currencies = await this.currencyService.getAllCurrencies();
    res.json({ currencies });
  };

  #insertCurrency = async (req, res) => {
    const currency = req.body.currency;
    const result = await this.currencyService.insertCurrency(currency);
    res.json({ result });
  };

  #validateCurrency = async (req, res, next) => {
    const { currency } = req.body;
    if (
      currency &&
      currency.length === 3 &&
      (/^[A-Z]+[A-Z]$/.test(currency) || /^[a-z]+[a-z]$/.test(currency))
    ) {
      return next();
    }
    return res.status(400).send("INVALID CURRENCY");
  };
}

module.exports = new CurrencyController(currencyService);
