import React, { useEffect, useState } from 'react';
import styles from './AddNewReceipt.module.css';

import PageTitle from 'components/helper/PageTitle';
import MainCard from 'components/UI/MainCard';
import ReceiptInfo from 'components/add-new-receipt/new-receipt-info/ReceiptInfo';
import ReceiptProductList from 'components/add-new-receipt/new-receipt-product-list/ReceiptProductList';
import ReceiptAddProduct from 'components/add-new-receipt/new-receipt-add-product/ReceiptAddProduct';

import { isReceiptInfoValid } from './AddNewReceipt.validator';


const EXAMPLE_DATA = [
  {name:"banana", category:"food",price:"255"},
  {name:"krompir", category:"food",price:"180"},
  {name:"tanjiri", category:"food",price:"120"},
  {name:"truck", category:"fun",price:"360"}
]

const DEFAULT_RECEIPT_INFO = {
  name:"",
  address:"",
  'date-day':"",
  'date-month':"",
  'date-year':"",
  'date-hour':"",
  'date-minute':"",
};

const DEFAULT_IS_EDITING = { isEditing:false };

function AddNewReceipt(props) {
  const [articles, setArticles] = useState(EXAMPLE_DATA);
  const [receiptInfo, setReceiptInfo] = useState(DEFAULT_RECEIPT_INFO);
  const [isEditing, setIsEditing] = useState(DEFAULT_IS_EDITING);

  function addArticleHandler(article) {
    if ( !isEditing.isEditing) {
      setArticles(prevState => {
        return [...prevState, article];
      });
    } else {
      setArticles([...articles.slice(0, isEditing.article.id), article, ...articles.slice(isEditing.article.id + 1)]);
      setIsEditing(DEFAULT_IS_EDITING);
    }
  };
  
  function removeArticleAtIndex(index) {
    setArticles(articles.slice(0,index).concat(articles.slice(index + 1)));
    setIsEditing(DEFAULT_IS_EDITING);
  };

  function submitHandler(e) {
    e.preventDefault();
    if (isReceiptInfoValid(receiptInfo) && articles.length > 0) {
      
      if (!props.isUpdating) {
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
      } else {
        let jsonBody = JSON.stringify({
          id:props.info.id,
          info:receiptInfo,
          receipt: articles
        });

        fetch('http://localhost:8000/api/receipts',{
          method:'PUT',
          headers: {
            'Content-Type': "application/json",
          },
          body: jsonBody
        });
      }
      props.onAddReceipt(receiptInfo, articles);
      setReceiptInfo(DEFAULT_RECEIPT_INFO);
      setArticles([]);
    } else {
      // TODO:
    };
  };

  function editArticle(article) {
    setIsEditing(prevState => {
      if (prevState.isEditing && prevState.article.id === article.id) return DEFAULT_IS_EDITING; 
      return {isEditing:true, article}
    });
  };

  useEffect(() => {
    if (props.isUpdating) {
      setArticles(props.articles);
      setReceiptInfo(props.info);
    };
  },[props.isUpdating, props.articles, props.info]);

  return (
    <div>
      {!props.isUpdating ? <PageTitle title="New Receipt"/> : <PageTitle title="Edit Receipt"/>}
      <MainCard>
        <form className={styles['new-receipt-content-wrapper']} onSubmit={submitHandler}>
          <ReceiptInfo value={receiptInfo} onChangeValue={setReceiptInfo}/>
          <ReceiptProductList onEditInit={editArticle} editIndex={isEditing.article?.id} onRemoveArticle={removeArticleAtIndex} articleList={articles} />
          <ReceiptAddProduct onAddArticle={addArticleHandler} edit={isEditing}/>
          <div className={styles['new-receipt-actions']}>
            <button type='submit'>{!props.isUpdating ? "Add" : "Update"} Receipt</button>
            <button type='button'>Clear Receipt</button>
          </div>
        </form>
      </MainCard>
    </div>
  );
};

export default AddNewReceipt;

