import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './DashboardLatestCategory.module.css';
import categoryStyleSheet from 'helper/categoriesObject.const';

function DashboardLatestCategory({category}) {
  const catInfo = categoryStyleSheet[category.toLowerCase()] || categoryStyleSheet[20];
  return (
    <div style={{borderColor:catInfo.color}} className={styles['dashboard__latest-category']}>
      <div style={{color:catInfo.color}} className={styles['dashboard__latest-category-image']} ><FontAwesomeIcon icon={catInfo.icon}/></div>
      <div style={{ backgroundColor:catInfo.color, color: catInfo.textColor }} className={styles['dashboard__latest-category-name']} >{category}</div>
    </div>
  );
};

export default DashboardLatestCategory;
