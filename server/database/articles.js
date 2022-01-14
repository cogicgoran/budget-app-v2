const { dbConn } = require("./connection");

function insertArticles(res, body, id) {
  let string = "";
  const articles = body.articles;
  const currency = body.currency;
  let queryItems = [];

  queryItems.push(articles[0].name, articles[0].category, 1, articles[0].price, articles[0].price, currency, id);

  for (let i = 1; i < articles.length; i++) {
    string += ", (?, (SELECT id from categories WHERE name = ?),?, ?, ?, ? , ?)";
    queryItems.push(articles[i].name, articles[i].category, 1, articles[i].price, articles[i].price, currency, id);
  }

  dbConn.query(
    `INSERT INTO articles ( name, category_id, amount, total_price, unit_price, currency, receipt_id ) 
    VALUES (?, (SELECT id from categories WHERE name = ?),?, ?, ?, ?, ?)${string};`,
    queryItems,
    function(err, results, fields) {
      if(err){
        console.log(err);
        return res.status(500).json({error:"Something went wrong"});
      } else {
        return res.status(200).json({message:"Successfully added receipt into database"});
      }
    }
  );
}

module.exports = {
  insertArticles
}

// INSERT INTO articles ( id, name, category_id, receipt_id, currency, unit_price, amount, total_price ) 
// VALUES (3, "Kafa", 1, 2, "RSD", 440, 1, 444);