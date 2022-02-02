import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FontAwesomeIcon icon={faChevronRight}
      className={className}
      style={{ ...style, display: "block",color:"black", height:"30px" }}
      onClick={onClick}
    />
  );
};

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FontAwesomeIcon icon={faChevronLeft}
      className={className}
      style={{ ...style, display: "block",color:"black",height:"30px" }}
      onClick={onClick}
    />
  );
};

