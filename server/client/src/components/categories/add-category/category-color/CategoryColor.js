import React, { useRef, useCallback } from "react";
import CategoryShowcase from "../category-showcase/CategoryShowcase";
import ColorItem from "./ColorsItem";
import { categoryColors } from "helper/categoriesObject.const";
import styles from "./CategoryColor.module.css";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCategoryContext } from "context/categories/CategoryContext";
import { NextArrow, PrevArrow } from "./slider-arrows/SliderArrows";

import './colors.css';

function CategoryColor({ currentIcon, onCancel }) {
  const { setColorIndex, categoryColorState } = useCategoryContext();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const time = useRef(0);
  const THROTTLE_RATE = 40; // ms, 120 for medium performance, 300 for slow performace aproximately

  function OnTouchMoveHandler() {
    let timeNow = Date.now();
    if (timeNow - time.current > THROTTLE_RATE) {
      const wrapper = document.querySelector(".swiper-color-initialized");
      const trackWrapperElementRect = wrapper.getBoundingClientRect();
      const { top, height, left, width } = trackWrapperElementRect;
      const elementToFindCoordinatesAt = [left + width / 2, top + height / 2];
      const foundElement = document
        .elementsFromPoint(...elementToFindCoordinatesAt)
        .find((el) => el.classList.contains("swiper-slide"));
      if (!foundElement) return;
      setColorIndex(Number(foundElement.dataset.swiperSlideIndex));
      time.current = timeNow;
    }
  }

  function setCurrentIndex({ realIndex }) {
    setColorIndex(realIndex);
  }

  const onInit = useCallback(function (swiper) {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  return (
    <div className={styles["category__color-select"]}>
      <h3 className={styles["add-category__title"]}>Add Category</h3>
      <CategoryShowcase icon={currentIcon} />
      <div className="swiper-color-wraper" style={{ position: "relative" }}>
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%,-50%)",
            top: "50%",
            height: "calc(100% + 6px)",
            boxSizing: "border-box",
            width: "24px",
            backgroundColor: "transparent",
            borderWidth: "3px",
            borderColor: categoryColorState.value.borderColor,
            borderStyle: "solid",
            zIndex: "2",
          }}
        ></div>
          <div className="slider-color__prev" ref={prevRef}>
            <PrevArrow />
          </div>
          <div className="slider-color__next" ref={nextRef}>
            <NextArrow />
          </div>
        <Swiper
          modules={[Navigation]}
          navigation={{navigation: {
            nextEl: '.slider-color__next',
            prevEl: '.slider-color__prev'
          }}}
          containerModifierClass="swiper-color-"
          slidesPerView={7}
          centeredSlides={true}
          initialSlide={3}
          onTouchMove={OnTouchMoveHandler}
          onSlideChange={setCurrentIndex}
          onInit={(swiper) => onInit(swiper)}
          preventClicksPropagation={false}
          style={{ width: 147 }}
          grabCursor={true}
          loop={true}
          loopedSlides={20}
        >
          {categoryColors.map(({ color, borderColor }) => {
            return (
              <SwiperSlide key={color} style={{ height: "unset" }}>
                <ColorItem color={color} borderColor={borderColor} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles["add-category__controls"]}>
        <button className={styles["add-category__cancel"]} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles["add-category__confirm"]}>Add</button>
      </div>
    </div>
  );
}

export default CategoryColor;
