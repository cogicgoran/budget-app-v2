import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CategoryShowcase.module.css';


function CategoryShowcase({color, icon}) {
  return (
    <div style={{borderColor:color}} className={styles['category-showcase']}>
      <div style={{color:color}} className={styles['category-showcase__image']} >{icon && <FontAwesomeIcon icon={icon}/>}</div>
      <div style={{backgroundColor:color}} className={styles['category-showcase__name']} >TYPE HERE</div>
    </div>
  );
};

export default CategoryShowcase;
