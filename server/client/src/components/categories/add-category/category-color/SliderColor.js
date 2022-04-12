import React, { useEffect, useRef, useState } from 'react';
import useTransform from './hooks/useTransform';

import styles from './SliderColor.module.css';
import { PrevArrow, NextArrow } from '../category-icon/slider-arrows/SliderArrows';

function SliderColor({children, setCurrentColor}) {
  const {sliderColorRef, trackRef, trackWrapperRef, handlePrevClick, handleNextClick, handleMouseDown, handleMouseEnter, handleMouseLeave} = useTransform(setCurrentColor, styles);

  return (
    <div ref={sliderColorRef} className={styles['slider-color__wrapper']}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={trackWrapperRef} className={styles['slider-color__track-wrapper']}>
        <div ref={trackRef} className={styles['slider-color__track']} onMouseDown={handleMouseDown}>
          {children}
        </div>
      </div>
      <div className={styles['slider-color__prev']} onClick={handlePrevClick}><PrevArrow /></div>
      <div className={styles['slider-color__next']} onClick={handleNextClick}><NextArrow /></div>
    </div>
  );
};



export default SliderColor;
