import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CategoryShowcase.module.css';
import categoryStyleSheet from 'helper/categoriesObject.const';


function CategoryShowcase({color}) {
  const appleIcon = categoryStyleSheet.food.icon;
  return (
    <div style={{borderColor:color}} className={styles['category-showcase']}>
      <div style={{color:color}} className={styles['category-showcase__image']} ><FontAwesomeIcon icon={appleIcon}/></div>
      <div style={{backgroundColor:color}} className={styles['category-showcase__name']} >TYPE HERE</div>
    </div>
  );
};

export default CategoryShowcase;
