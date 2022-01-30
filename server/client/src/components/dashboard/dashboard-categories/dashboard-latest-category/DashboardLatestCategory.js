
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './DashboardLatestCategory.module.css';

function DashboardLatestCategory(props) {
  const {icon, color, textColor, category} = props;
  return (
    <div style={{borderColor:color}} className={styles['dashboard__latest-category']}>
      <div style={{color:color}} className={styles['dashboard__latest-category-image']} ><FontAwesomeIcon icon={icon}/></div>
      <div style={{ backgroundColor:color, color: textColor }} className={styles['dashboard__latest-category-name']} >{category}</div>
    </div>
  );
};

export default DashboardLatestCategory;
