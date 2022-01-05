import React from 'react';
import styles from './MainCard.module.css'

function MainCard(props) {
  return (
    <div className={styles['main-card']}>
      {props.children}
    </div>
  );
};

export default MainCard;
