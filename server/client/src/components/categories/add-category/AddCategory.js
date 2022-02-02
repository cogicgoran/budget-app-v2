import React from "react";
import styles from "./AddCategory.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CategoryColor from "./category-color/CategoryColor";
import CategoryIcon from "../category-icon/CategoryIcon";
function AddCategory(props) {

  return (
    <div className={styles["add-category-container"]}>
      <CategoryColor onCancel={props.onCancel}/>
      <CategoryIcon />
    </div>
  );
}

export default AddCategory;
