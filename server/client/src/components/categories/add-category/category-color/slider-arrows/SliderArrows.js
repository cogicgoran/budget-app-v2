import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NextArrow(props) {
  return (
    <FontAwesomeIcon
      icon={solid('chevron-right')}
      onClick={props.onClick}
    />
  );
}

export function PrevArrow(props) {
  return (
    <FontAwesomeIcon
      icon={solid('chevron-left')}
      onClick={props.onClick}
    />
  );
}
