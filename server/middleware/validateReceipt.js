function validateReceipt(req, res, next) {
  const {info, receipt} = req.body;

  if (!receipt instanceof Array) return res.status(400).send("Receipt must be array type");

  const string = [info['date-month'], info['date-day'], info['date-year']].join("/") + " " + [info['date-hour'],info['date-minute'],"00"].join(":");
  const date = new Date(string);

  const isReceiptValid = receipt.every(article => {
    const articleName = article.name.trim();
    const articleCategory = article.category.trim();
    const articlePrice = article.price.trim();
    const artNumber = Number(articlePrice);
  
    if (articleName != "" 
    && articleName.length > 2
    && articleCategory != ""
    && articleCategory.length > 0
    && articlePrice != ""
    && articlePrice.length > 0
    && articlePrice.length < 12
    && !Number.isNaN(artNumber)
    && artNumber > 0
    ) return true;
    return false;
  });

  if (!isReceiptValid) return res.status(400).send("INVALID RECEIPT");

  if (date instanceof Date && isFinite(date)) {
    req.body.date = [info['date-year'], info['date-month'], info['date-day']].join("/") + " " + [info['date-hour'],info['date-minute'],"00"].join(":");
    return next();
  };

  return res.status(400).send("INVALID DATE");

};

module.exports = validateReceipt;