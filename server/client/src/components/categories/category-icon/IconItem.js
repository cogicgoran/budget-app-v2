import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './IconItem.module.css';

function IconItem({icon}) {
  return (
    // <div className={styles['icon-container']}>
      <FontAwesomeIcon icon={icon}/>
    // </div>
  );
};

export default IconItem;
