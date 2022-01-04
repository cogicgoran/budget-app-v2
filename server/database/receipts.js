const { dbConn } = require("./connection");

function getAllReceipts(res) {
  dbConn.query('SELECT * FROM receipts;', function(err, results, fields) {
    if (err) {
        res.json({error:"error"});
    }else {
        res.json({results});
    }
  });
}

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
    'INSERT INTO receipts ( shop_name, shop_address, receipt_date, articles ) VALUES (?, ?, ?, ?)',
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
  getReceiptById,
  insertReceipt,
  updateReceipt
}