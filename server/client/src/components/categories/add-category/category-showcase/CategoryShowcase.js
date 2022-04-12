import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CategoryShowcase.css";
import { useCategoryContext } from "context/categories/CategoryContext";

function CategoryShowcase({ icon }) {
  const { categoryColorState } = useCategoryContext();
  return (
    <div
      style={{ borderColor: categoryColorState.value?.borderColor }}
      className="category-showcase"
    >
      <div
        style={{ color: categoryColorState.value.color }}
        className="category-showcase__image"
      >
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
      <div
        style={{
          backgroundColor: categoryColorState.value?.color,
          borderColor: categoryColorState.value?.borderColor,
        }}
        className="category-showcase__name"
      >
        TYPE HERE
      </div>
    </div>
  );
}

export default CategoryShowcase;
