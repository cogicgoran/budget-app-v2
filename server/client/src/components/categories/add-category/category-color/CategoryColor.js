import React, {useState, useCallback} from 'react';
import CategoryShowcase from '../category-showcase/CategoryShowcase';
import ColorItem from './ColorsItem';
import Slider from 'react-slick';
import { categoryColors } from 'helper/categoriesObject.const';
import styles from './CategoryColor.module.css';
import { PrevArrow, NextArrow } from '../slider-arrows/SliderArrows';

function CategoryColor(props) {
  const getIndex = useCallback(function getIndexCallback(index) {
    return (index + 4) % 20;
  }, []);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [currentColor, setCurrentColor] = useState(categoryColors[getIndex(0)]);

  function sliderChange(index) {
    setCurrentColor(categoryColors[getIndex(index)].color);
    setCurrentIndex(getIndex(index));
  }

  function initChange() {
    setCurrentColor(categoryColors[getIndex(0)].color);
    setCurrentIndex(getIndex(0));
  }

  const colorSliderOptions = {
    infinite: true,
    speed: 200,
    slidesToShow: 9,
    slidesToScroll: 1,
    swipeToSlide: true,
    afterChange: sliderChange,
    onInit:initChange,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={styles["category__color-select"]}>
        <h3 className={styles["add-category__title"]}>Add Category</h3>
        <CategoryShowcase icon="" color={currentColor} />
        <Slider className={styles["color-slider"]} {...colorSliderOptions}>
          {categoryColors.map((colors, index) => (
            <ColorItem key={index} {...colors} index={index} currentIndex={currentIndex}/>
          ))}
        </Slider>
        <div className={styles["add-category__controls"]}>
          <button
            className={styles["add-category__cancel"]}
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button className={styles["add-category__confirm"]}>Add</button>
        </div>
      </div>
  );
};

export default CategoryColor;
