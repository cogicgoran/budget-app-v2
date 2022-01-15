import React, { useState, useEffect } from 'react';
import styles from './ReceiptAddProduct.module.css';
import { isValidArticle } from './ReceiptAddProduct.validator';
import { useTranslation } from 'react-i18next';

const NEW_ARTICLE_DEFAULT = {
  name:"",
  category:"",
  price:"",
  // amount:""
};

function ReceiptAddProduct(props) {
  const { t } = useTranslation();
  const [ article, setArticle] = useState(NEW_ARTICLE_DEFAULT);
  const [isProductValid, setIsProductValid] = useState(false);

  const textAdd = t('add');
  const textAddProduct = t('addProduct');
  const textCategory = t('category');
  const textCancel = t('cancel');
  const textName = t('name');
  const textPrice = t('price');
  const textProductName = t('productName');

  function clickHandler() {
    if (isValidArticle(article)) {
      props.onAddArticle({
        name: article.name.trim(),
        category: article.category.trim(),
        price: Number(article.price.trim())
      });
      // setArticle(NEW_ARTICLE_DEFAULT);
      props.onCancel();
    } else {
      setIsProductValid(false);
    }
  };

  function changeHandler(e) {
    setArticle(prevState => {
      return {
        ...prevState,
        [e.target.name]:e.target.value
      };
    });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isValidArticle(article)) {
        setIsProductValid(true);
      } else {
        setIsProductValid(false);
      }
    }, 300);
    return () => {
      clearTimeout(timerId);
    }
  },[article])

  const addButtonClasses = isProductValid ? styles['new-product__add-article-btn'] : styles['new-product__add-article-btn'] + " " + styles.disabled;

  return (
    <div className={styles['new-product']}>
      <div>
        <h4>{textAddProduct}</h4>
        <div>
          <div className={styles['new-product-input']}>
            <label htmlFor="product-name">{textProductName}:</label>
            <input type="text" id='product-name' name='name' placeholder={`${textName}...`} value={article.name} onChange={changeHandler}/>
          </div>
          <div className={styles['new-product-input']}>
            <label htmlFor="product-category">{textCategory}:</label>
            <input type="text" id='product-category' name='category' placeholder={`${textCategory}...`} value={article.category} onChange={changeHandler}/>
          </div>
          <div className={styles['new-product-input']}>
            <label htmlFor="product-price">{textPrice}:</label>
            <input type="text" id='product-price' name='price' value={article.price} placeholder={`${textPrice}...`}onChange={changeHandler}/>
          </div>
          {/* <div className={styles['new-product-input']}>
            <label htmlFor="product-amount">Amount:</label>
            <input type="number" id='product-amount' name='amount' value={article.amount} placeholder='Amount...' onChange={changeHandler}/>
          </div> */}
        </div>

        <div className={styles['new-product__controls']}>
          <button className={styles['new-product__cancel-btn']} type='button' onClick={props.onCancel}>{textCancel}</button>
          <button className={addButtonClasses} type='button' onClick={clickHandler}>{textAdd}</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptAddProduct;
