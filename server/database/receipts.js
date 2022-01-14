const { dbConn } = require("./connection");
const { insertArticles } = require("./articles");

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
 WHERE adddate(receipt_date,90) > current_timestamp() ORDER BY receipt_date DESC;`
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

function getMonthReceipts(res) {
  dbConn.query(`SELECT a.name, a.total_price, a.currency, c.name FROM (SELECT * FROM receipts WHERE month(receipt_date) = month(current_timestamp()) AND year(receipt_date) = year(current_timestamp())) AS r
  INNER JOIN articles AS a ON r.id = a.receipt_id
  INNER JOIN categories AS c on a.category_id = c.id;`, function(err, results, fields) {
    if (err) {
      res.json({error:"error"});
    }else {
      res.json(results);
    }
  });
}

function insertReceipt(res, body) {
  dbConn.query(
    'INSERT INTO receipts ( marketplace_id, receipt_date, total_price, currency ) VALUES (?,?,?,?);',
    [body.marketplace, body.date, body.price, body.currency],
    function(err, results, fields) {
      if(err){
        return res.status(500).json({error:"Something went wrong"});
      } else {
        return insertArticles(res, body, results.insertId);
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

function countInsertedCategories(res, next,categories, categoriesLength) {
  console.log([...categories]);
  const query = `SELECT COUNT(id) AS count FROM categories WHERE name IN (${dbConn.escape(categories)});`
  console.log("query:", query);
  dbConn.query(query, function(err, results, fields) {
    if (err) {
      console.log("err");
      return res.status(500).send("SERVER ERROR");
    }else {
      console.log("rsponse:",results[0].count);
      if (categoriesLength == results[0].count){
        console.log("callling next");
        return next();
      } else {
        return res.status(400).json("INVALID CATEGORIES");
      }
    }
  });
}

module.exports = {
  getAllReceipts,
  getLatestReceipts,
  getReceiptById,
  getMonthReceipts,
  insertReceipt,
  updateReceipt,
  countInsertedCategories
}