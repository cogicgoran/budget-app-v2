import React from 'react';
import { PATHS } from 'App.constants';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import CategorySmallDisplay from './CategorySmallDisplay';

import styles from './Receipt.module.css';

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function Receipt(props) {
  const date = new Date(props['receipt_date']);

  return (
    <article className={styles['dashboard__receipt']}>
      <CategorySmallDisplay category={props['mostSpentCategory'].catName} />
      <div>{props['shop_name']}</div>
      <div>{weekday[date.getDay()]}, {date.toLocaleDateString("en-GB",{day:"numeric" , month:"short", year: "numeric"})}</div>
      <div>{props['receipt_price']} {props['currency']}</div>
      <div className={styles['dashboard__receipt-actions']}>
        <Link to={PATHS.VIEW_RECEIPTS + "/" + props.receipt_id}><FontAwesomeIcon className={styles['dashboard__receipt-icon']} icon={faEye}/></Link>
        <Link to={PATHS.EDIT_RECEIPTS + "/" + props.receipt_id}><FontAwesomeIcon className={styles['dashboard__receipt-icon']} icon={faPenToSquare}/></Link>
        <div><FontAwesomeIcon className={styles['dashboard__receipt-icon']} icon={faTrashAlt}/></div>
      </div>
    </article>
  );
};

export default Receipt;
