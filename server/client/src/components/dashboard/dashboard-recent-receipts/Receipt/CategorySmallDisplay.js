import React from "react";
import styles from "./CategorySmallDisplay.module.css";
import categoryStyleSheet from 'helper/categoriesObject.const';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CategorySmallDisplay({ category }) {
  const catInfo = categoryStyleSheet[category.toLowerCase()] || categoryStyleSheet[20];
  return (
    <div>
      <span style={{backgroundColor:catInfo.color, borderColor:catInfo.border}} className={styles["category-small"]}>{<FontAwesomeIcon icon={catInfo.icon}/>}{category}</span>
    </div>
  );
}

export default CategorySmallDisplay;