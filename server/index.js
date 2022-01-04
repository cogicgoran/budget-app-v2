const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const validateReceipt = require("./middleware/validateReceipt");
const { getAllReceipts, getReceiptById, insertReceipt, updateReceipt } = require("./database/receipts");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/receipts', function(req, res) {
  getAllReceipts(res);
});

app.get('/receipts/:receiptId', function(req, res) {
  const { receiptId } = req.params;
  getReceiptById(res, receiptId);
});

app.post('/receipts', validateReceipt, function (req, res) {
  const jsonString = JSON.stringify(req.body.receipt);
  insertReceipt(res, req.body, jsonString)
}); 

app.put('/receipts', validateReceipt, function (req, res) {
  const jsonString = JSON.stringify(req.body.receipt);
  updateReceipt(res, req.body, jsonString);
}); 

app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`) );