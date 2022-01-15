import React from 'react';
import styles from './ReceiptProductList.module.css';
import ReceiptProduct from './ReceiptProduct';
import { useTranslation } from 'react-i18next';

function ReceiptProductList(props) {
  const { t } = useTranslation();
  const textProductName = t('productName');
  const textCategory = t('category');
  const textPrice = t('price');

  return (
    <div>
      <table className={styles['new-receipt-table']}>
        <thead>
          <tr>
            <th>{textProductName}</th>
            <th>{textCategory}</th>
            <th>{textPrice}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.articleList.map( (article, index) => {
            return <ReceiptProduct key={index} onRemoveArticle={props.onRemoveArticle} {...article} id={index} currency={props.currency}/>;
          })}
        </tbody>
      </table>
      <span className={styles['new-receipt-total']}>{props.total.toFixed(2)} {props.currency}</span>
    </div>
  );
};

export default ReceiptProductList;
