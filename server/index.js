const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConn } = require("./database/connection");
const validateReceipt = require("./middleware/validateReceipt");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/receipts', function(req, res) {
  dbConn.query('SELECT * FROM receipts;', function(err, results, fields) {
    if (err) {
        res.json({error:"error"});
    }else {
        res.json({results});
    }
  });
});

app.get('/receipts/:receiptId', function(req, res) {
  const { receiptId } = req.params;
  
  dbConn.query('SELECT * FROM receipts WHERE id = ?;',[ receiptId ], function(err, results, fields) {
    if (err) {
        res.json({error:"error"});
    }else {
        res.json({result:results[0]});
    }
  });
});

app.post('/receipts', validateReceipt, function (req, res) {
  const jsonString = JSON.stringify(req.body.receipt);

  dbConn.query(
    'INSERT INTO receipts ( shop_name, shop_address, receipt_date, articles ) VALUES (?, ?, ?, ?)',
    [req.body.info.name, req.body.info.address, req.body.date, jsonString],
    function(err, results, fields) {
      if(err){
      } else {
      }
    }
  );

  return res.status(200).json({message:"Successfully added receipt into database"});
}); 

app.put('/receipts', validateReceipt, function (req, res) {
  const jsonString = JSON.stringify(req.body.receipt);
  console.log(req.body);


  dbConn.query(
    'UPDATE receipts SET shop_name = ?, shop_address = ?, receipt_date = ?, articles = ? WHERE id = ?;',
    [req.body.info.name, req.body.info.address, req.body.date, jsonString, req.body.info.id],
    function(err, results, fields) {
      if(err){
        console.log(err);
      } else {
        console.log(results, fields);
      }
    }
  );

  return res.status(200).json({message:"Successfully added receipt into database"});
}); 

app.get('/', function (req, res) {
});


app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`) );