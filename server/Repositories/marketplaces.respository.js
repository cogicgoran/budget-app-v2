const { dbConn } = require("../database/connection");

class MarketplaceRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  getAllMarketplaces = async () => {
    const sql = 'SELECT id, name, address FROM marketplaces';
    try {
      const result = await this.dbConn.query(sql);
      return result;
    } catch (error) {
      // FIX: handle error accordingly
    }
  }

  insertMarketplace = async (body) => {
    const sql = 'INSERT INTO marketplaces (name, address) VALUES ( ?, ?)';
    try {
      const result = await this.dbConn.query(sql, [body.name, body.address]);
      return result;
    } catch (error) {
      // FIX: handle error accordingly
    }
  }
}

module.exports = new MarketplaceRepository(dbConn);