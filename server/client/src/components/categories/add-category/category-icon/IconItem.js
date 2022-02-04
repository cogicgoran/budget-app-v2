import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./IconItem.module.css";
import CategoryShowcase from "../category-showcase/CategoryShowcase";

function IconItem({ icon, isActive, color }) {
  return (
    <>
      {!isActive && (
        <div className={styles["icon-item"]}>
          <FontAwesomeIcon icon={icon} color={color} />
        </div>
      )}
      {isActive && (
        <div>
          <CategoryShowcase icon={icon} color={color} />
        </div>
      )}
    </>
  );
}

export default IconItem;
