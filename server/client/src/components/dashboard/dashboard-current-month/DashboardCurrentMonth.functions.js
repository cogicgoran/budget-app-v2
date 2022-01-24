export function handleIncomingArticles(articles) {
    console.log(articles);
  const cat = {};
  let total = 0;
  articles.forEach(result => {
      if (!cat[result.name]) {
          cat[result.name] = result.total_price;
      } else {
          cat[result.name] += result.total_price;
      }
      total += result.total_price;
  })
  const array = [];
  for (const key in cat) {
      if (Object.hasOwnProperty.call(cat, key)) {
          array.push({category_name:key, category_value:cat[key]});
      }
  }
  array.sort((a,b) => b.category_value - a.category_value);
  return [array.slice(0,3), total];
}