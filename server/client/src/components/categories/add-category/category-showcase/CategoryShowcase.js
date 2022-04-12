import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CategoryShowcase.module.css";
import { useCategoryContext } from "context/categories/CategoryContext";

function CategoryShowcase({ icon }) {
  const { categoryColorState } = useCategoryContext();
  return (
    <div
      style={{ borderColor: categoryColorState.value?.color }}
      className={styles["category-showcase"]}
    >
      <div
        style={{ color: categoryColorState.value?.color }}
        className={styles["category-showcase__image"]}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
      <div
        style={{ backgroundColor: categoryColorState.value?.color }}
        className={styles["category-showcase__name"]}
      >
        TYPE HERE
      </div>
    </div>
  );
}

export default CategoryShowcase;
