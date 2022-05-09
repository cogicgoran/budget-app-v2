const { dbConn } = require("../database/connection");

class ReceiptsRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  getAllReceipts = async () => {
    const sql = "SELECT * FROM receipts;";
    const result = await this.dbConn.promise().query(sql);
    return result[0];
  };

  getLatestReceipts = async () => {
    const sql = `SELECT r.id AS receipt_id, m.name AS shop_name, m.address AS shop_address, r.currency, r.receipt_date, r.total_price AS receipt_price, a.total_price AS articlePrice, c.name AS cat_name
    FROM ( SELECT * FROM receipts ORDER BY receipt_date DESC LIMIT 0,5 ) AS r 
   INNER JOIN articles AS a ON r.id = a.receipt_id 
   INNER JOIN marketplaces as m ON m.id = r.marketplace_id 
   INNER JOIN categories as c ON c.id = a.category_id
   WHERE adddate(receipt_date,90) > current_timestamp() ORDER BY receipt_date DESC;`;
    const result = await this.dbConn.promise().query(sql);
    return result[0];
  };

  getReceiptById = async (receiptId) => {
    const sql = "SELECT * FROM receipts WHERE id = ?;";
    const result = await this.dbConn.promise().query(sql, [receiptId]);
    return result;
    // FIX: handle error accordingly
  };

  getMonthReceipts = async () => {
    const sql = `SELECT a.name, a.total_price, a.currency, c.name FROM (SELECT * FROM receipts WHERE month(receipt_date) = month(current_timestamp()) AND year(receipt_date) = year(current_timestamp())) AS r
    INNER JOIN articles AS a ON r.id = a.receipt_id
    INNER JOIN categories AS c on a.category_id = c.id;`;
    const result = await this.dbConn.promise().query(sql);
    return result[0];
  };

  insertReceipt = async (body) => {
    const sql =
      "INSERT INTO receipts ( marketplace_id, receipt_date, total_price, currency ) VALUES (?,?,?,?);";
    const result = await this.dbConn
      .promise()
      .query(sql, [body.marketplace, body.date, body.price, body.currency]);
    return result[0];
  };

  updateReceipt = async (body, jsonString) => {
    const sql =
      "UPDATE receipts SET shop_name = ?, shop_address = ?, receipt_date = ?, articles = ? WHERE id = ?;";
    const result = await this.dbConn
      .promise()
      .query(sql, [
        body.info.name,
        body.info.address,
        body.date,
        jsonString,
        body.info.id,
      ]);
    return result[0];
  };

  countInsertedCategories = async (categories) => {
    const sql = `SELECT COUNT(id) AS count FROM categories WHERE name IN (${dbConn.escape(
      categories
    )});`;
    const result = await this.dbConn.promise().query(sql);
    return result[0];
  };
}

module.exports = new ReceiptsRepository(dbConn);
