import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./IconItem.module.css";
import { useCategoryContext } from "context/categories/CategoryContext";

function IconItem({ icon }) {
  const { categoryColorState } = useCategoryContext();
  return (
    <div className={styles["icon-item"]}>
      <FontAwesomeIcon icon={icon} color={categoryColorState.value?.color} />
    </div>
  );
}

export default IconItem;
