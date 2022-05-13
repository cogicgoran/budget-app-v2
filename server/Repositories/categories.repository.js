const { dbConn } = require("../database/connection");

class CategoryRepository {
  constructor(dbConn) {
   this.dbConn = dbConn;
  }

  getAllCategories = async () => {
    const sql = 'SELECT * FROM categories';
    const result = await this.dbConn.promise().query(sql);
    return result[0];
  }

  insertCategory = async (data) => {
    const { name, icon_name, color_main, color_border } = data;
    const sql = 'INSERT INTO categories (name, icon_name, color_main, color_border) VALUES ( ?, ?, ?, ?)';
    const result = await this.dbConn.promise().query(sql, [name, icon_name, color_main, color_border]);
    return result[0];
  }
}

module.exports = new CategoryRepository(dbConn);