import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NextArrow(props) {
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      onClick={props.onClick}
    />
  );
}

export function PrevArrow(props) {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      onClick={props.onClick}
    />
  );
}
