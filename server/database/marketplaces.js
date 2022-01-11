const { dbConn } = require("./connection");

function getAllMarketplaces(res) {
  dbConn.query(`SELECT id, name, address FROM marketplaces`, function(err, results, fields) {
    if (err) {
      res.json({error:"error"});
    }else {
      res.json(results);
    }
  });
}

module.exports = {
  getAllMarketplaces
};