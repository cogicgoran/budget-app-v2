import React from 'react';
import { PATHS } from 'App.constants';
import { Link } from 'react-router-dom';

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
        <Link to={PATHS.VIEW_RECEIPTS + "/" + props.receipt_id}><div>eye</div></Link>
        <Link to={PATHS.VIEW_RECEIPTS + "/" + props.receipt_id}><div>edit</div></Link>
        <div>del</div>
      </div>
    </article>
  );
};

export default Receipt;
