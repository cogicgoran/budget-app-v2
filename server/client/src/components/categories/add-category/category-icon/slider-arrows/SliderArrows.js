import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NextArrow() {
  return <FontAwesomeIcon icon={solid('chevron-right')}/>;
};

export function PrevArrow() {
  return <FontAwesomeIcon icon={solid('chevron-left')}/>;
};

