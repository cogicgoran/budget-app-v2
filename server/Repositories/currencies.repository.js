const { dbConn } = require("../database/connection");

class ReceiptsRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  getAllCurrencies = async () => {
    const sql = `SELECT code FROM currencies`;
    const result = await this.dbConn.promise().query(sql);
    return result[0];
  };

  insertCurrency = async (currency) => {
    const sql = "INSERT IGNORE INTO currencies ( code ) VALUES ( ? )";
    const result = await this.dbConn
      .promise()
      .query(sql, [currency.toUpperCase()]);
    return result[0];
  };
}

module.exports = new ReceiptsRepository(dbConn);
