import React from "react";
import CategoryShowcase from "../category-showcase/CategoryShowcase";
import ColorItem from "./ColorsItem";
import { categoryColors } from "helper/categoriesObject.const";
import styles from "./CategoryColor.module.css";
import SliderColor from "./SliderColor";

function CategoryColor(props) {

  return (
    <div className={styles["category__color-select"]}>
      <h3 className={styles["add-category__title"]}>Add Category</h3>
      <CategoryShowcase icon={props.currentIcon} color={props.currentColor} />
      <SliderColor currentColor={props.currentColor} setCurrentColor={props.setCurrentColor}>
        {categoryColors.map((colors, index) => (
          <ColorItem
            key={index}
            {...colors}
          />
        ))}
        {categoryColors.map((colors, index) => (
          <ColorItem
            key={index + 20}
            {...colors}
          />
        ))}
      </SliderColor>
      <div className={styles["add-category__controls"]}>
        <button
          className={styles["add-category__cancel"]}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={styles["add-category__confirm"]}>Add</button>
      </div>
    </div>
  );
}

export default CategoryColor;
