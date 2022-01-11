import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import styles from './AddNewReceipt.module.css';

import ReceiptInfo from 'components/add-new-receipt/new-receipt-info/ReceiptInfo';
import ReceiptProductList from 'components/add-new-receipt/new-receipt-product-list/ReceiptProductList';
import ReceiptAddProduct from 'components/add-new-receipt/new-receipt-add-product/ReceiptAddProduct';
import Backdrop from 'components/UI/backdrop/Backdrop';

import { isReceiptInfoValid } from './AddNewReceipt.validator';


const DEFAULT_RECEIPT_INFO = {
  marketplace:"",
  date:"",
  currency:""
};

function AddNewReceipt(props) {
  const [articles, setArticles] = useState([]);
  const [receiptInfo, setReceiptInfo] = useState(DEFAULT_RECEIPT_INFO);
  const [showModal, setShowModal] = useState(false);

  // const totalPrice = articles.reduce((acc,val) => acc + val.total_price,0);

  function addArticleHandler(article) {
    
      setArticles(prevState => {
        return [...prevState, article];
      });
    
  };
  
  function removeArticleAtIndex(index) {
    setArticles(articles.slice(0,index).concat(articles.slice(index + 1)));
  };

  function submitHandler(e) {
    e.preventDefault();
    if (isReceiptInfoValid(receiptInfo) && articles.length > 0) {
      
      
        let jsonBody = JSON.stringify({
          info:receiptInfo,
          receipt: articles
        });

        fetch('http://localhost:8000/api/receipts',{
          method:'POST',
          headers: {
            'Content-Type': "application/json",
          },
          body: jsonBody
        });
      props.onAddReceipt(receiptInfo, articles);
      setReceiptInfo(DEFAULT_RECEIPT_INFO);
      setArticles([]);
    } else {
      // TODO:
    };
  };

  return (
    <div className={styles['new-receipt']}>
      <h3>NEW RECEIPT</h3>
      <div>
        <form className={styles['new-receipt-content-wrapper']} onSubmit={submitHandler}>
          <ReceiptInfo value={receiptInfo} onChangeValue={setReceiptInfo}/>
          <ReceiptProductList onRemoveArticle={removeArticleAtIndex} articleList={articles} />
          {showModal && ReactDOM.createPortal( <Backdrop onCancel={() => setShowModal(false)}/>, document.getElementById('backdrop-root'))}
          {showModal && ReactDOM.createPortal( <ReceiptAddProduct currency={receiptInfo.currency} onAddArticle={addArticleHandler} onCancel={() => setShowModal(false)}/>, document.getElementById('overlay-root'))}
          <button className={styles['new-receipt__add-product']} type='button' onClick={() => setShowModal(true)}>+ ADD PRODUCT</button>
          <div className={styles['new-receipt-actions']}>
            <button className={styles['new-receipt-finish-btn']} type='submit'>FINISH</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewReceipt;

