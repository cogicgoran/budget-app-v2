const currencyRepository = require("../Repositories/currencies.repository");

class CurrencyService {
  constructor(currencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  getAllCurrencies = async () => {
    const currencies = await this.currencyRepository.getAllCurrencies();
    return currencies;
  };

  insertCurrency = async (currency) => {
    const result = await this.currencyRepository.insertCurrency(currency);
    return result;
  };
}

module.exports = new CurrencyService(currencyRepository);
