import React from 'react';
import styles from './ReceiptProductList.module.css';
import ReceiptProduct from './ReceiptProduct';

function ReceiptProductList(props) {
  return (
    <div>
      <table className={styles['new-receipt-table']}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.articleList.map( (article, index) => {
            return <ReceiptProduct onEditInit={props.onEditInit} editIndex={props.editIndex} onRemoveArticle={props.onRemoveArticle} key={index} name={article.name} category={article.category} price={article.price} id={index}/>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptProductList;
