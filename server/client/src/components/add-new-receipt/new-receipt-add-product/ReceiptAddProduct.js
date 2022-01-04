import React, { useState, useRef, useEffect } from 'react';
import styles from './ReceiptAddProduct.module.css';
import { isValidArticle } from './ReceiptAddProduct.validator';

const NEW_ARTICLE_DEFAULT = {
  name:"",
  category:"",
  price:""
};

function ReceiptAddProduct(props) {
  const [ article, setArticle] = useState(NEW_ARTICLE_DEFAULT);

  useEffect(() => {
    if ( props.edit.isEditing){
      setArticle(props.edit.article);
    } else {
      setArticle(NEW_ARTICLE_DEFAULT);
    }
  }, [props.edit]);

  function clickHandler() {
    if (isValidArticle(article)) {
      props.onAddArticle({
        name: article.name.trim(),
        category: article.category.trim(),
        price: article.price.trim()
      });
      setArticle(NEW_ARTICLE_DEFAULT);
      return true;
    }
    return false;
  }

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
      <div className={styles['new-product__add-button']} onClick={clickHandler}>
      { props.edit.isEditing ? <button type='button'>Confirm Edit</button>: <button type='button'>Add Article +</button>}
        
      </div>
      <div className={styles['new-product-inputs']}>
        <div>
          <label htmlFor="product-name">Product Name</label>
          <input type="text" id='product-name' name='name' value={article.name} onChange={changeHandler}/>
        </div>
        <div>
          <label htmlFor="product-category">Category</label>
          <input type="text" id='product-category' name='category' value={article.category} onChange={changeHandler}/>
        </div>
        <div>
          <label htmlFor="product-price">Price</label>
          <input type="text" id='product-price' name='price' value={article.price} onChange={changeHandler}/>
        </div>
      </div>
    </div>
  );
};

export default ReceiptAddProduct;
