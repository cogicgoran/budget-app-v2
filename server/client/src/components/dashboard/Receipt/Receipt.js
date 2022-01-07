import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'App.constants';

import styles from './Receipt.module.css';

function Receipt(props) {
  const navigate = useNavigate();
  console.log(props);

  return (
    <article className={styles['dashboard__receipt']}>
      <div>{props['most_spent_category']}</div>
      <div>{props['shop_name']}</div>
      <div>{new Date(props['receipt_date']).toLocaleDateString("en-GB",{day:"numeric" , month:"short", year: "numeric"})}</div>
      <div>{props['total_price']} {props['currency']}</div>
      <div className={styles['dashboard__receipt-actions']}>
        <div>eye</div>
        <div onClick={()=> navigate(PATHS.VIEW_RECEIPTS + "/" + props.id)}>edit</div>
        <div>del</div>
      </div>
    </article>
  );
};

export default Receipt;
