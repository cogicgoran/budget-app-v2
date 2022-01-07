const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const validateReceipt = require("./middleware/validateReceipt");
const validateCurrency = require("./middleware/validateCurrency");
const { getAllReceipts, getLatestReceipts, getReceiptById, insertReceipt, updateReceipt } = require("./database/receipts");
const { getAllCurrencies, insertCurrency } = require("./database/currency");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/api/receipts', function(req, res) {
  getAllReceipts(res);
});

app.get('/api/receipts-latest', function(req, res) {
  getLatestReceipts(res);
});

app.get('/api/receipts/:receiptId', function(req, res) {
  const { receiptId } = req.params;
  getReceiptById(res, receiptId);
});

app.post('/api/receipts', validateReceipt, function (req, res) {
  const jsonString = JSON.stringify(req.body.receipt);
  insertReceipt(res, req.body, jsonString)
}); 

app.put('/api/receipts', validateReceipt, function (req, res) {
  const jsonString = JSON.stringify(req.body.receipt);
  updateReceipt(res, req.body, jsonString);
}); 

app.get('/api/currencies', function (req, res) {
  getAllCurrencies(res);
});

app.post('/api/currencies', validateCurrency, function (req, res) {
  insertCurrency(res, req.body.currency);
}); 

app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`) );