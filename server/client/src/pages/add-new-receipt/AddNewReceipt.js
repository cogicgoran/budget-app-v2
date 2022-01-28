import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import styles from './AddNewReceipt.module.css';
import { useUnauthenticatedRedirect } from 'hooks/use-redirect/useAuthRedirect';

import ReceiptInfo from 'components/add-new-receipt/new-receipt-info/ReceiptInfo';
import ReceiptProductList from 'components/add-new-receipt/new-receipt-product-list/ReceiptProductList';
import ReceiptAddProduct from 'components/add-new-receipt/new-receipt-add-product/ReceiptAddProduct';
import Backdrop from 'components/UI/backdrop/Backdrop';

import { useNavigate } from 'react-router-dom';
import { PATHS } from 'App.constants';
import { isReceiptInfoValid } from './AddNewReceipt.validator';
import { useTranslation } from 'react-i18next';

const DEFAULT_RECEIPT_INFO = {
  marketplace:"",
  date:"",
  currency:""
};

function AddNewReceipt() {
  useUnauthenticatedRedirect();
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [receiptInfo, setReceiptInfo] = useState(DEFAULT_RECEIPT_INFO);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  

  const textAddProduct = t('addProduct');
  const textFinish = t('finish');
  const textNewReceipt = t('newReceipt');

  const totalPrice = articles.reduce((acc,article) =>  acc + article.price, 0);

  function addArticleHandler(article) {
      setArticles(prevState => {
        return [...prevState, article];
      });
  };
  
  function removeArticleAtIndex(index) {
    setArticles(articles.slice(0,index).concat(articles.slice(index + 1)));
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (isReceiptInfoValid(receiptInfo) && articles.length > 0) {
        let jsonBody = JSON.stringify({
          info:receiptInfo,
          articles: articles
        });

        const response = await fetch('http://localhost:8000/api/receipts',{
          method:'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: jsonBody
        });

        if (response.status === 200) {
          setReceiptInfo(DEFAULT_RECEIPT_INFO);
          setArticles([]);
          navigate(PATHS.DASHBOARD);
        }
    } else {
      // TODO:
    };
  };

  return (
    <div className={styles['new-receipt']}>
      <h3>{textNewReceipt}</h3>
      <div>
        <form className={styles['new-receipt-content-wrapper']} onSubmit={submitHandler}>
          <ReceiptInfo value={receiptInfo} onChangeValue={setReceiptInfo}/>
          <ReceiptProductList onRemoveArticle={removeArticleAtIndex} articleList={articles} total={totalPrice} currency={receiptInfo.currency}/>
          {showModal && ReactDOM.createPortal( <Backdrop onCancel={() => setShowModal(false)}/>, document.getElementById('backdrop-root'))}
          {showModal && ReactDOM.createPortal( <ReceiptAddProduct currency={receiptInfo.currency} onAddArticle={addArticleHandler} onCancel={() => setShowModal(false)}/>, document.getElementById('overlay-root'))}
          <button className={styles['new-receipt__add-product']} type='button' onClick={() => setShowModal(true)}>+ {textAddProduct}</button>
          <div className={styles['new-receipt-actions']}>
            <button className={styles['new-receipt-finish-btn']} type='submit'>{textFinish}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewReceipt;

