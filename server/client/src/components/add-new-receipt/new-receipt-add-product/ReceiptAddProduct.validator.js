export function isValidArticle( article ) {
  const articleName = article.name.trim();
  const articleCategory = article.category.trim();
  const articlePrice = article.price.trim();
  const artNumber = Number(articlePrice);

    if (articleName !== "" 
    && articleName.length > 0
    && articleCategory !== ""
    && articleCategory.length > 0
    && articlePrice !== ""
    && articlePrice.length > 0
    && articlePrice.length < 12
    && !Number.isNaN(artNumber)
    && artNumber > 0
     ) {
       return true;
    }
    return false;
}