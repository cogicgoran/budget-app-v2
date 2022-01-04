import React from 'react';
import styles from './PageTitle.module.css';

function PageTitle(props) {
  return (
    <div className={styles['page-title']}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default PageTitle;
