import React from "react";
import styles from "./ColorsItem.module.css";

function ColorItem({ index, color, borderColor }) {
  const styleObj = {
    backgroundColor: color,
    borderColor: borderColor,
    width: "21px",
    height: "60px",
  };
  return (
    <div
      style={styleObj}
      className={[styles["color-item"], "js-color-item"].join(" ")}
    ></div>
  );
}

export default ColorItem;
