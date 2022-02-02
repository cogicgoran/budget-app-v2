import React from 'react';
import styles from './CategoryIcon.module.css';
import Slider from 'react-slick';
import IconItem from './IconItem';
import { categoryIcons } from 'helper/categoriesObject.const';

import { PrevArrow, NextArrow } from '../add-category/slider-arrows/SliderArrows';

function CategoryIcon() {
  const iconSliderOptions = {
    infinite: true,
    speed: 300,
    // centerMode: true,
    // variableWidth: true,
    slidesToShow: 7,
    // slidesToScroll: 1,
    // afterChange: sliderChange,
    className:styles["slider-item-center"],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={styles["category__icon-select"]}>
        <Slider className={styles["icon-slider"]} {...iconSliderOptions}>
          {categoryIcons.map((icon, index) => (
            <IconItem key={index} icon={icon} />
          ))}
        </Slider>
      </div>
  );
};

export default CategoryIcon;
