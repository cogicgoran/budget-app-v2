function validateReceipt(req, res, next) {
  const { currency } = req.body;
  if ( currency && currency.length === 3 && ( /^[A-Z]+[A-Z]$/.test(currency) || /^[a-z]+[a-z]$/.test(currency) )){
    return next();
  }
  return res.status(400).send("INVALID CURRENCY");
};

module.exports = validateReceipt;