import React from "react";
import styles from "./AddCategory.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useCategoryContext,
} from "context/categories/CategoryContext";

import CategoryColor from "./category-color/CategoryColor";
import CategoryIcon from "./category-icon/CategoryIcon";

function AddCategory(props) {
  const { isIconCategoryToggled, categoryValue, categoryColorState, categoryIconState } = useCategoryContext();

  const formSubmit = () => {
    const name = categoryValue;
    const color = categoryColorState.value;
    const icon = categoryIconState.value;

    const formData = {
      name, color, icon
    }
    // TODO: VALIDATE INPUTS
    console.log(formData);
    props.onCancel();
  }

  return (
    <div className={styles["add-category-container"]}>
      <CategoryColor onCancel={props.onCancel} onSubmit={formSubmit} />
      {isIconCategoryToggled && <CategoryIcon />}
    </div>
  );
}

export default AddCategory;
