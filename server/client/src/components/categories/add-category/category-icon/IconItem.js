import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./IconItem.module.css";
import CategoryShowcase from "../category-showcase/CategoryShowcase";
import { useCategoryContext } from "context/categories/CategoryContext";

function IconItem({ icon, isActive }) {
  const {categoryColorState} = useCategoryContext();
  return (
    <>
      {!isActive && (
        <div className={styles["icon-item"]}>
          <FontAwesomeIcon icon={icon} color={categoryColorState.value?.color} />
        </div>
      )}
      {isActive && (
        <div>
          <CategoryShowcase icon={icon} />
        </div>
      )}
    </>
  );
}

export default IconItem;
