import React, { useState } from 'react';
import styles from './ReceiptAddProduct.module.css';
import { isValidArticle } from './ReceiptAddProduct.validator';

const NEW_ARTICLE_DEFAULT = {
  name:"",
  category:"",
  price:"",
  // amount:""
};

function ReceiptAddProduct(props) {
  const [ article, setArticle] = useState(NEW_ARTICLE_DEFAULT);


  function clickHandler() {
    if (isValidArticle(article)) {
      props.onAddArticle({
        name: article.name.trim(),
        category: article.category.trim(),
        price: Number(article.price.trim())
      });
      // setArticle(NEW_ARTICLE_DEFAULT);
      props.onCancel();
    };
  };

  function changeHandler(e) {
    setArticle(prevState => {
      return {
        ...prevState,
        [e.target.name]:e.target.value
      };
    });
  };

  return (
    <div className={styles['new-product']}>
      <div>
        <h4>ADD PRODUCT</h4>
        <div>
          <div className={styles['new-product-input']}>
            <label htmlFor="product-name">Product Name:</label>
            <input type="text" id='product-name' name='name' placeholder='Name...' value={article.name} onChange={changeHandler}/>
          </div>
          <div className={styles['new-product-input']}>
            <label htmlFor="product-category">Category:</label>
            <input type="text" id='product-category' name='category' placeholder='Category...' value={article.category} onChange={changeHandler}/>
          </div>
          <div className={styles['new-product-input']}>
            <label htmlFor="product-price">Price:</label>
            <input type="text" id='product-price' name='price' value={article.price} placeholder='Price...' onChange={changeHandler}/>
          </div>
          {/* <div className={styles['new-product-input']}>
            <label htmlFor="product-amount">Amount:</label>
            <input type="number" id='product-amount' name='amount' value={article.amount} placeholder='Amount...' onChange={changeHandler}/>
          </div> */}
        </div>

        <div className={styles['new-product__controls']}>
          <button className={styles['new-product__cancel-btn']} type='button' onClick={props.onCancel}>CANCEL</button>
          <button className={styles['new-product__add-article-btn']} type='button' onClick={clickHandler}>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptAddProduct;
