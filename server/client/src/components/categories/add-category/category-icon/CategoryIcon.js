import React, { useMemo, useRef, useCallback} from 'react';
import styles from './CategoryIcon.module.css';
import IconItem from './IconItem';
import { categoryIcons } from 'helper/categoriesObject.const';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import './test.css';

import { PrevArrow, NextArrow } from './slider-arrows/SliderArrows';

function CategoryIcon(props) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const updateClasses = useCallback(function updateClassesCb({ $el, slides, activeIndex }) {
    $el.find('.swiper-slide-prev-prev').removeClass('swiper-slide-prev-prev');
    slides.eq(activeIndex).prev().prev().addClass('swiper-slide-prev-prev');
    $el.find('.swiper-slide-prev-prev-prev').removeClass('swiper-slide-prev-prev-prev');
    slides.eq(activeIndex).prev().prev().prev().addClass('swiper-slide-prev-prev-prev');

    $el.find('.swiper-slide-next-next').removeClass('swiper-slide-next-next');
    slides.eq(activeIndex).next().next().addClass('swiper-slide-next-next');
    $el.find('.swiper-slide-next-next-next').removeClass('swiper-slide-next-next-next');
    slides.eq(activeIndex).next().next().next().addClass('swiper-slide-next-next-next');
    
    props.setCurrentIcon(categoryIcons[activeIndex%20])
  },[props]);

  const onInit = useCallback(function(swiper){
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
    updateClasses(swiper);
  },[updateClasses])

  const swiperSettings = useMemo(() => {
    return {
      modules:[Navigation],
      loop:true,
      navigation:true,
      speed:500,
      centeredSlides:true,
      slidesPerView:'auto',
      onSlideChange:(swiper) => updateClasses(swiper),
      onInit:(swiper) => onInit(swiper),
    }
  },[updateClasses,onInit]);
  
  return (
    <div className={`${styles['category__icon-select']} iconswiper`}>

      <Swiper className={styles['icon-slider']} {...swiperSettings}>
        {categoryIcons.map((icon,index) => {
          return <SwiperSlide key={index}>{({isActive}) => (<IconItem icon={icon} isActive={isActive}/>)}</SwiperSlide>
        })}
        <div className={`${styles['icon-slider__nav-prev']} ${styles['icon-slider__nav']}`} ref={prevRef}><PrevArrow /></div>
        <div className={`${styles['icon-slider__nav-next']} ${styles['icon-slider__nav']}`} ref={nextRef}><NextArrow /></div>
      </Swiper>
    </div>
  );
};

export default CategoryIcon;
