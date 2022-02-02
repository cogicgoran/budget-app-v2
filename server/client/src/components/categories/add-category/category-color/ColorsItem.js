import React from 'react';
import styles from './ColorsItem.module.css';

function ColorItem({color, borderColor, currentIndex, index}) {
  const isCurrent = currentIndex === index;
  const styleObj = {backgroundColor: color, 'border':isCurrent ? `2px solid ${borderColor}`:'unset'};
  return (
    <div className={styles['color-item-container']}>
      <div style={styleObj} className={styles['color-item']}>
    </div>
    </div>
  );
};

export default ColorItem;
