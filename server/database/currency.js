const { dbConn } = require("./connection");

function getAllCurrencies(res) {
  dbConn.query("SELECT * FROM currencies",
  function(err, result, fields) {
    if(err) {
      return res.status(500).json({error:"Something went wrong"});
    }else {
      console.log(result);
      return res.json(result);
    }
  });
};

function insertCurrency(res, currency) {
  dbConn.query("INSERT IGNORE INTO currencies ( code ) VALUES ( ? )",
  [currency.toUpperCase()],
  function(err, result, fields) {
    if(err) {
      console.log(err);
      return res.status(500).json({error:"Something went wrong"});
    }else {
      console.log(result, fields);
      return res.status(200).json({message:"Successfully added currency"});
    }
  });
};

module.exports = {
  insertCurrency,
  getAllCurrencies
}