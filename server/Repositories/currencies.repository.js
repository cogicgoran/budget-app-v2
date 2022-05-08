const { dbConn } = require("../database/connection");

class ReceiptsRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  getAllCurrencies = async () => {
    const sql = `SELECT code FROM currencies`;
    try {
      const currencies = await this.dbConn.query(sql);
      return currencies;
    } catch (error) {
      // FIX: handle error accordingly
    }
  };

  insertCurrency = async (currency) => {
    const sql = 'INSERT IGNORE INTO currencies ( code ) VALUES ( ? )'
    try {
      const result = await this.dbConn.query(sql, [currency.toUpperCase()]);
      return result;
    } catch (error) {
      // FIX: handle error accordingly
    }
  }
}

module.exports = new ReceiptsRepository(dbConn);
