import React from 'react';
import { PATHS } from 'App.constants';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import styles from './Receipt.module.css';

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function Receipt(props) {
  const date = new Date(props['receipt_date']);

  return (
    <article className={styles['dashboard__receipt']}>
      <div><span>{props['mostSpentCategory'].catName}</span></div>
      <div>{props['shop_name']}</div>
      <div>{weekday[date.getDay()]}, {date.toLocaleDateString("en-GB",{day:"numeric" , month:"short", year: "numeric"})}</div>
      <div>{props['receipt_price']} {props['currency']}</div>
      <div className={styles['dashboard__receipt-actions']}>
        <Link to={PATHS.VIEW_RECEIPTS + "/" + props.receipt_id}><FontAwesomeIcon className={styles['dashboard__receipt-icon']} icon={faEye}/></Link>
        <Link to={PATHS.VIEW_RECEIPTS + "/" + props.receipt_id}><FontAwesomeIcon className={styles['dashboard__receipt-icon']} icon={faEdit}/></Link>
        <div><FontAwesomeIcon className={styles['dashboard__receipt-icon']} icon={faTrash}/></div>
      </div>
    </article>
  );
};

export default Receipt;
