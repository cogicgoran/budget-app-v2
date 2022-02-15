import React, { useEffect, useRef, useState } from 'react';

import styles from './SliderColor.module.css';
import { PrevArrow, NextArrow } from '../category-icon/slider-arrows/SliderArrows';

function SliderColor({children, setCurrentColor}) {
  const {trackRef, trackWrapperRef, handlePrevClick, handleNextClick} = useTransform(setCurrentColor);

  return (
    <div className={styles['slider-color__wrapper']}>
      <div ref={trackWrapperRef} className={styles['slider-color__track-wrapper']}>
        <div ref={trackRef} className={styles['slider-color__track']}>
          {children}
        </div>
      </div>
      <div className={styles['slider-color__prev']} onClick={handlePrevClick}><PrevArrow /></div>
      <div className={styles['slider-color__next']} onClick={handleNextClick}><NextArrow /></div>
    </div>
  );
};

function useTransform(setCurrentColor) {
  const CLICK_DELAY = 120;
  const [isMoving, setIsMoving] = useState(false);
  const trackRef = useRef();
  const trackWrapperRef = useRef();

  function loopTransition(translationValue) {
    if ( translationValue < -504 ) {
      console.log("high limit")
      trackRef.current.classList.remove(styles['transition--on']);
      trackRef.current.style.transform = `translateX(${(translationValue + 18*20)}px)`
      getCenteredElementInfo();
    };
    if ( translationValue > 0) {
      console.log("low limit")
      trackRef.current.classList.remove(styles['transition--on']);
      trackRef.current.style.transform = `translateX(${(translationValue - 18*20)}px)`;
      getCenteredElementInfo();
    }
  }

  function getCenteredElementInfo(direction) {
    const trackWrapperElementRect = trackWrapperRef.current.getBoundingClientRect();
    const { top, height, left, width} =  trackWrapperElementRect;
    // Because the transition is not instant, we have to find what element is before/after centered element using offset variable
    const offset = direction === 'left' ? -18: direction === 'right' ? 18 : 0;
    const elementToFindCoordinatesAt = [left + width/2 + offset, top + height/2];
    const foundElement = document.elementFromPoint(...elementToFindCoordinatesAt).closest('.js-color-item');
    if(!foundElement) {
      // Some error display
    } else {
      setCurrentColor(foundElement.style.backgroundColor)
      trackRef.current.querySelector(`.${styles['color-center-item']}`)?.classList.remove(`${styles['color-center-item']}`);
      foundElement.classList.add(`${styles['color-center-item']}`);
    }
  }

  function handleAfterTransition(direction, translationValue) {
    getCenteredElementInfo(direction)
    setTimeout(()=> {
      loopTransition(translationValue);
      setIsMoving(false);
      setTimeout(() => trackRef.current.classList.add(styles['transition--on']));
      // Delay to stop additional clicks due to transition time of 200ms,(delay is 60% of transition time)
    }, CLICK_DELAY);

  }

  useEffect(() => {
    trackRef.current.style.transform = `translateX(${(-18*20)}px)`;
    setTimeout(()=> {
      trackRef.current.classList.add(styles['transition--on']);
    },0)
    handleAfterTransition();
  }, []);

  function handlePrevClick() {
    if (isMoving) return;
    setIsMoving(true);
    
    let prevTranslation = trackRef.current.style.transform.match(/-?\d+/);
    prevTranslation = ( prevTranslation && Number(prevTranslation[0]) ) || 0;
    const nextTranslation = prevTranslation + 18;
    trackRef.current.style.transform = `translateX(${nextTranslation}px)`;
    handleAfterTransition('left', nextTranslation);
  }

  function handleNextClick() {
    if (isMoving) return;
    setIsMoving(true);
    let prevTranslation = trackRef.current.style.transform.match(/-?\d+/);
    prevTranslation = ( prevTranslation && Number(prevTranslation[0]) ) || 0;
    const nextTranslation = prevTranslation - 18;
    trackRef.current.style.transform = `translateX(${nextTranslation}px)`;
    handleAfterTransition('right', nextTranslation)
  }

  return {trackRef, trackWrapperRef, handlePrevClick, handleNextClick}
}

export default SliderColor;
