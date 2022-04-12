import React, { useEffect, useRef, useState } from "react";
import styles from "./CategoryIcon.module.css";
import IconItem from "./IconItem";
import { categoryIcons } from "helper/categoriesObject.const";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "./icons.css";
import "swiper/css";

import { PrevArrow, NextArrow } from "./slider-arrows/SliderArrows";
import { useCategoryContext } from "context/categories/CategoryContext";

function CategoryIcon(props) {
  const { setColorIndex, categoryColorState, categoryIconState, setIconIndex } =
    useCategoryContext();
    const [isMoving, setIsMoving] = useState(false);
  const wrapperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const time = useRef(0);

  const THROTTLE_RATE = 60; // ms, 120 for medium performance, 300 for slow performace aproximately

  function clearClasses() {
    wrapperRef.current?.querySelector(".swiper-slide-current")?.classList.remove("swiper-slide-current");
    wrapperRef.current?.querySelector(".swiper-slide-p1")?.classList.remove("swiper-slide-p1");
    wrapperRef.current?.querySelector(".swiper-slide-p2")?.classList.remove("swiper-slide-p2");
    wrapperRef.current?.querySelector(".swiper-slide-n1")?.classList.remove("swiper-slide-n1");
    wrapperRef.current?.querySelector(".swiper-slide-n2")?.classList.remove("swiper-slide-n2");
  }

  function setClasses(el) {
    clearClasses();
    el.classList.add("swiper-slide-current");
    el.previousSibling.classList.add("swiper-slide-p1");
    el.previousSibling.previousSibling.classList.add("swiper-slide-p2");
    el.nextSibling.classList.add("swiper-slide-n1");
    el.nextSibling.nextSibling.classList.add("swiper-slide-n2");
  }

  function OnTouchEndHandler() {
    setIsMoving(false);
    setTimeout(() => {
      console.log('called after 200');
      const wrapper = document.querySelector(".swiper-icon-initialized");
        const trackWrapperElementRect = wrapper.getBoundingClientRect();
        const { top, height, left, width } = trackWrapperElementRect;
        const elementToFindCoordinatesAt = [left + width / 2, top + height / 2];
        const foundElement = document
          .elementsFromPoint(...elementToFindCoordinatesAt)
          .find((el) => el.classList.contains("swiper-slide"));
        if (!foundElement) return;
        setClasses(foundElement);
        setIconIndex(Number(foundElement.dataset.swiperSlideIndex));
        time.current = 0;
    },200)
  }

  function OnTouchMoveHandler() {
    let timeNow = Date.now();
    if (timeNow - time.current > THROTTLE_RATE) {
      const wrapper = document.querySelector(".swiper-icon-initialized");
      const trackWrapperElementRect = wrapper.getBoundingClientRect();
      const { top, height, left, width } = trackWrapperElementRect;
      const elementToFindCoordinatesAt = [left + width / 2, top + height / 2];
      const foundElement = document
        .elementsFromPoint(...elementToFindCoordinatesAt)
        .find((el) => el.classList.contains("swiper-slide"));
      if (!foundElement) return;
      setClasses(foundElement);
      setIconIndex(Number(foundElement.dataset.swiperSlideIndex));
      time.current = timeNow;
    }
  }

  function setCurrentIndex(data) {
    const { top, height, left, width } = document.querySelector(".swiper-icon-initialized").getBoundingClientRect();
    const elementToFindCoordinatesAt = [left + width / 2, top + height / 2];
    const foundElement = document
      .elementsFromPoint(...elementToFindCoordinatesAt)
      .find((el) => el.classList.contains("swiper-slide"));
    setClasses(foundElement);
    setIconIndex(data.realIndex);
  }

  useEffect(() => {
    
  }, [categoryIconState]);

  return (
    <div className={`${styles["category__icon-select"]}`}>
      <div className="swiper-icon-wraper" style={{ position: "relative" }}>
        <div className="slider-icon__nav slider-icon__prev" ref={prevRef}>
          <PrevArrow />
        </div>
        <div className="slider-icon__nav slider-icon__next" ref={nextRef}>
          <NextArrow />
        </div>
        <CategoryShowcaseTransparent isMoving={isMoving} />
        <Swiper
          className={styles["icon-slider"]}
          containerModifierClass="swiper-icon-"
          modules={[Navigation]}
          navigation={{
            nextEl: ".slider-icon__next",
            prevEl: ".slider-icon__prev",
          }}
          slidesPerView={7}
          centeredSlides={true}
          style={{ width: 420, height: 120 }}
          loop={true}
          loopedSlides={10}
          onTouchMove={OnTouchMoveHandler}
          onTouchEnd={OnTouchEndHandler}
          onTouchStart={setIsMoving.bind(null, true)}
          onSlideChangeTransitionEnd={setCurrentIndex}
          initialSlide={3}
          onInit={(swiper)=> wrapperRef.current = swiper.el}
        >
          {categoryIcons.map((icon) => {
            return (
              <SwiperSlide key={icon.iconName}>
                <IconItem icon={icon} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

function CategoryShowcaseTransparent({isMoving}) {
  const { categoryColorState } = useCategoryContext();
  return (
    <div
      style={{
        opacity: isMoving ? 0.8 : 1,
        borderColor: categoryColorState.value.borderColor
      }}
      className="category-showcase-transparent"
    >
      <div
        className="category-showcase-transparent__image"
      ></div>
      <div
        style={{ backgroundColor: categoryColorState.value?.color,
        borderColor:categoryColorState.value?.borderColor }}
        className="category-showcase-transparent__name"
      >
        TYPE HERE
      </div>
    </div>
  );
}

export default CategoryIcon;
