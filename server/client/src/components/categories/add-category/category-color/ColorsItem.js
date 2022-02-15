import React from 'react';
import styles from './ColorsItem.module.css';

function ColorItem({color, borderColor}) {
  const styleObj = {backgroundColor: color, borderColor: borderColor};
  return (
      <div style={styleObj}  className={[styles['color-item'],'js-color-item'].join(" ")}>
    </div>
  );
};

export default ColorItem;
