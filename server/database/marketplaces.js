const { dbConn } = require("./connection");

function getAllMarketplaces(res) {
  dbConn.query(`SELECT id, name, address FROM marketplaces`, function(err, results, fields) {
    if (err) {
      res.json({error:"error"});
    }else {
      res.json(results);
    }
  });
};

function insertMarketplace(res, data) {
  dbConn.query(`INSERT INTO marketplaces (name, address) VALUES ( ?, ?)`, [data.name, data.address], function(err, results, fields) {
    if (err) {
      return res.json({error:"error"});
    }else {
      return res.sendStatus(200);
    }
  });
};

module.exports = {
  getAllMarketplaces,
  insertMarketplace
};