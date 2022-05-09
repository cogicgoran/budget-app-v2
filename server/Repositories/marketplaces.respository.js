const { dbConn } = require("../database/connection");

class MarketplaceRepository {
  constructor(dbConn) {
    this.dbConn = dbConn;
  }

  getAllMarketplaces = async () => {
    const sql = "SELECT id, name, address FROM marketplaces";
    const result = await this.dbConn.promise().query(sql);
    return result[0];
  };

  insertMarketplace = async (body) => {
    const sql = "INSERT INTO marketplaces (name, address) VALUES ( ?, ?)";
    const result = await this.dbConn
      .promise()
      .query(sql, [body.name, body.address]);
    return result[0];
  };
}

module.exports = new MarketplaceRepository(dbConn);
