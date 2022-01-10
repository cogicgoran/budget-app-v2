import React from 'react';
import styles from './CategoryReceipt.module.css';

function CategoryReceipt(props) {
  return (
    <div className={styles['dashboard__current-month-category']}>
      <span>{props.category_name}</span>
      <span>{props.category_value} RSD</span>
    </div>
  );
};

export default CategoryReceipt;
