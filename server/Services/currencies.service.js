const currencyRepository = require('../Repositories/currencies.repository');

class CurrencyService {
  constructor(currencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  getAllCurrencies = async () => {
    try {
      const currencies = await this.currencyRepository.getAllCurrencies();
      return currencies;
    } catch (error) {
      // FIX: handle error accordingly
    }
  }

  insertCurrency = async (currency) => {
    try {
      const result = await this.currencyRepository.insertCurrency(currency);
      return result;
    } catch (error) {
      // FIX: handle error accordingly
    }
  }
}

module.exports = new CurrencyService(currencyRepository)