import { useState, useEffect, useRef } from "react";

export default function useTransform(setCurrentColor, styles) {
  const CLICK_DELAY = 120;
  const [isMoving, setIsMoving] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [prevPosition, setPrevPosition] = useState(null);
  const [startX, setStartX] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const sliderColorRef = useRef();
  const trackRef = useRef();
  const trackWrapperRef = useRef();
  const containerWidth = 18;
  
  useEffect(() => {
    trackRef.current.style.transform = `translateX(${-containerWidth * 20}px)`;
    setTimeout(() => {
      trackRef.current.classList.add(styles["transition--on"]);
    }, 0);
    handleAfterTransition();
  }, []);

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMouseDown]);
  
  useEffect(() => {
    window.addEventListener("mouseup", windowMouseUp);
    return () => {
      window.removeEventListener("mouseup", windowMouseUp);
    };
  }, []);

  function windowMouseUp(event) {
    setIsMouseDown((prevMouseState) => {
      if (prevMouseState) {
        trackRef.current.style.cursor = "grab";
        document.body.style.cursor = 'unset';
        setStartX(null);
        trackRef.current.classList.add("transition--on");
        const pos = getTransformPosition();
        const modulo18 = Math.abs(pos) % containerWidth;
        const borderModulo = containerWidth / 2;
        if(modulo18 > borderModulo) {
          trackRef.current.style.transform = `translateX(${pos- modulo18 + borderModulo}px)`;
        }else {
          trackRef.current.style.transform =`translateX(${pos + modulo18}px)`
        }
        handleAfterTransition("", pos);
      }
      return false;
    });
  };
  
  function loopTransition(translationValue) {
    if (translationValue < -504) {
      trackRef.current.classList.remove(styles["transition--on"]);
      trackRef.current.style.transform = `translateX(${
        translationValue + containerWidth * 20
      }px)`;
      getCenteredElementInfo();
    }
    if (translationValue > 0) {
      trackRef.current.classList.remove(styles["transition--on"]);
      trackRef.current.style.transform = `translateX(${
        translationValue - containerWidth * 20
      }px)`;
      getCenteredElementInfo();
    }
  }

  function getCenteredElementInfo(direction) {
    const trackWrapperElementRect =
      trackWrapperRef.current.getBoundingClientRect();
    const { top, height, left, width } = trackWrapperElementRect;
    // Because the transition is not instant, we have to find what element is before/after centered element using offset variable
    const offset = direction === "left" ? -18 : direction === "right" ? containerWidth : 0;
    const elementToFindCoordinatesAt = [
      left + width / 2 + offset,
      top + height / 2,
    ];
    const foundElement = document
      .elementFromPoint(...elementToFindCoordinatesAt)
      .closest(".js-color-item");
    if (!foundElement) {
      // Some error display
    } else {
      setCurrentColor(foundElement.style.backgroundColor);
      trackRef.current
        .querySelector(`.${styles["color-center-item"]}`)
        ?.classList.remove(`${styles["color-center-item"]}`);
      foundElement.classList.add(`${styles["color-center-item"]}`);
    }
  }

  function handleAfterTransition(direction, translationValue) {
    getCenteredElementInfo(direction);
    setTimeout(() => {
      loopTransition(translationValue);
      setIsMoving(false);
      setTimeout(() =>
        trackRef.current.classList.add(styles["transition--on"])
      );
      // Delay to stop additional clicks due to transition time of 200ms,(delay is 60% of transition time)
    }, CLICK_DELAY);
  }


  function handlePrevClick() {
    if (isMoving) return;
    setIsMoving(true);

    let prevTranslation = trackRef.current.style.transform.match(/-?\d+/);
    prevTranslation = (prevTranslation && Number(prevTranslation[0])) || 0;
    const nextTranslation = prevTranslation + containerWidth;
    trackRef.current.style.transform = `translateX(${nextTranslation}px)`;
    handleAfterTransition("left", nextTranslation);
  }

  function handleNextClick() {
    if (isMoving) return;
    setIsMoving(true);
    let prevTranslation = trackRef.current.style.transform.match(/-?\d+/);
    prevTranslation = (prevTranslation && Number(prevTranslation[0])) || 0;
    const nextTranslation = prevTranslation - containerWidth;
    trackRef.current.style.transform = `translateX(${nextTranslation}px)`;
    handleAfterTransition("right", nextTranslation);
  }

  function getTransformPosition() {
    let transformPositionX = trackRef.current.style.transform.match(/-?\d+/);
    return (transformPositionX && Number(transformPositionX[0])) || 0;
  }

  function handleMouseDown(event) {
    trackRef.current.style.cursor = "grabbing";
    document.body.style.cursor = 'grabbing';

    trackRef.current.classList.remove(styles["transition--on"]);
    setIsMouseDown(true);
    setPrevPosition(getTransformPosition());
    setStartX(event.clientX);
  }

  function handleMouseEnter(event) {
    if (!isMouseDown) {
      trackRef.current.style.cursor = "grab";
    }
  }

  function handleMouseLeave(event) {
    if (!isMouseDown) {
    }
  }

  function handleMouseMove(event) {
    trackRef.current.style.transform = `translateX(${prevPosition - startX + event.clientX}px)`;
    getCenteredElementInfo();
  };

  

  return {
    sliderColorRef,
    trackRef,
    trackWrapperRef,
    handlePrevClick,
    handleNextClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  };
}
