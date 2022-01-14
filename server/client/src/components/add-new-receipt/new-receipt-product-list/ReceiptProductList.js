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
          </tr>
        </thead>
        <tbody>
          {props.articleList.map( (article, index) => {
            return <ReceiptProduct key={index} onRemoveArticle={props.onRemoveArticle} {...article} id={index}/>;
          })}
        </tbody>
      </table>
      <span className={styles['new-receipt-total']}>{props.total.toFixed(2)} {props.currency}</span>
    </div>
  );
};

export default ReceiptProductList;
