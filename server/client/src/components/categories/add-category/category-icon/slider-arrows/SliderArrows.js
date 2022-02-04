import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NextArrow() {
  return <FontAwesomeIcon icon={faChevronRight}/>;
};

export function PrevArrow() {
  return <FontAwesomeIcon icon={faChevronLeft}/>;
};

