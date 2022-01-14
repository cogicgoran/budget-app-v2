const { countInsertedCategories } = require("../database/receipts");

function validateReceipt(req, res, next) {
  const {info, articles} = req.body;

  if (!articles instanceof Array) return res.status(400).send("Receipt must be array type");

  const date = new Date(info.date);

  const isReceiptValid = articles.every(article => {
    const articleName = article.name.trim();
    const articleCategory = article.category.trim();
  
    if (articleName != "" 
    && articleName.length > 0
    && articleCategory != ""
    && articleCategory.length > 0
    ) return true;
    return false;
  });

  if (!isReceiptValid) return res.status(400).send("INVALID RECEIPT");


  if (date instanceof Date && isFinite(date)) {
    const realdate= date.toISOString().slice(0,-5).replace("T", " ");
    req.body.date = realdate;
    req.body.marketplace = info.marketplace;
    req.body.currency = info.currency;
    req.body.price = articles.reduce((acc,article) => acc + Number(article.price),0)

    return next();
  };

  return res.status(400).send("INVALID DATE");

};


async function checkArticles(req, res, next) {
  const articles = req.body.articles;
  const categories = [];
  articles.forEach(article => {
    if (!categories.includes(article.category.toUpperCase())) {
      categories.push(article.category.toUpperCase());
    };
  });
  return countInsertedCategories(res ,next,categories, categories.length);
}

module.exports = {validateReceipt,checkArticles};