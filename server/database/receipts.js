const { dbConn } = require("./connection");

function getAllReceipts(res) {
  dbConn.query('SELECT * FROM receipts;', function(err, results, fields) {
    if (err) {
        res.json({error:"error"});
    }else {
        res.json({results});
    }
  });
};

function getLatestReceipts(res) {
  const sql = `SELECT r.id AS receipt_id, m.name AS shop_name, m.address AS shop_address, r.currency, r.receipt_date, r.total_price AS receipt_price, a.total_price AS articlePrice, c.name AS cat_name
  FROM ( SELECT * FROM receipts ORDER BY receipt_date DESC LIMIT 0,5 ) AS r 
 INNER JOIN articles AS a ON r.id = a.receipt_id 
 INNER JOIN marketplaces as m ON m.id = r.marketplace_id 
 INNER JOIN categories as c ON c.id = a.category_id
 WHERE adddate(receipt_date,90) > current_timestamp();`
  dbConn.query(sql, function(err, results, fields) {
    if (err) {
        res.status(500).json({error:"error"});
    }else {
        res.json(results);
    }
  });
};

function getReceiptById(res, receiptId) {
  dbConn.query('SELECT * FROM receipts WHERE id = ?;',[ receiptId ], function(err, results, fields) {
    if (err) {
        res.json({error:"error"});
    }else {
        res.json({result:results[0]});
    }
  });
}

function insertReceipt(res, body, jsonString) {
  dbConn.query(
    'INSERT INTO receipts ( shop_name, shop_address, receipt_date, articles ) VALUES (?, ?, ?, ?);',
    [body.info.name, body.info.address, body.date, jsonString],
    function(err, results, fields) {
      if(err){
        return res.status(500).json({error:"Something went wrong"});
      } else {
        return res.status(200).json({message:"Successfully added receipt into database"});
      }
    }
  );
}

function updateReceipt(res, body, jsonString) {
  dbConn.query(
    'UPDATE receipts SET shop_name = ?, shop_address = ?, receipt_date = ?, articles = ? WHERE id = ?;',
    [body.info.name, body.info.address, body.date, jsonString, body.info.id],
    function(err, results, fields) {
      if(err){
        return res.status(500).json({error:"Something went wrong"});
      } else {
        return res.status(200).json({message:"Successfully updated receipt"});
      }
    }
  );
}

module.exports = {
  getAllReceipts,
  getLatestReceipts,
  getReceiptById,
  insertReceipt,
  updateReceipt
}