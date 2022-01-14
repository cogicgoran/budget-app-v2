import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import styles from './ReceiptProduct.module.css';


function ReceiptProduct(props) {
  function removeHandler() {
    props.onRemoveArticle(props.id);
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td><span>{props.category}</span></td>
      <td>{props.price.toFixed(2)} {props.currency}</td>
      <td onClick={removeHandler}><FontAwesomeIcon className={styles['receipt-product-icon']} icon={faTrashAlt}/></td>
    </tr>
  );
};

export default ReceiptProduct;
