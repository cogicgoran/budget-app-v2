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
    const { name, iconName, colorMain, colorBorder } = data;
    const sql = 'INSERT INTO marketplaces (name, icon_name, color_main, color_border) VALUES ( ?, ?, ?, ?)';
    const result = await this.dbConn.promise().query(sql, [name, iconName, colorMain, colorBorder]); // TODO: inject data to sql query
    return result[0];
  }
}

module.exports = new CategoryRepository(dbConn);