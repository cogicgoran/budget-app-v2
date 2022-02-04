import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SliderArrows.module.css";

export function NextArrow(props) {
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      className={`${styles["slider-arrow"]} ${styles["slider-arrow-next"]}`}
      onClick={props.onClick}
    />
  );
}

export function PrevArrow(props) {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      className={`${styles["slider-arrow"]} ${styles["slider-arrow-prev"]}`}
      onClick={props.onClick}
    />
  );
}
