import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CategoryShowcase.css";
import { useCategoryContext } from "context/categories/CategoryContext";
import { useTranslation } from "react-i18next";

function CategoryShowcase({ icon, onClick }) {
  const { t } = useTranslation();
  const textTypeHere = t('typeHere');
  const { categoryColorState, categoryValue, setCategoryValue } = useCategoryContext();
  return (
    <div
      style={{ borderColor: categoryColorState.value?.borderColor }}
      className="category-showcase"
      onClick={onClick}
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
        <input
          className="category-showcase__input"
          type="text"
          placeholder={textTypeHere}
          value={categoryValue}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setCategoryValue(e.target.value)}
        />
        {categoryValue && <p className="tooltip-text">{categoryValue}</p>}
      </div>
    </div>
  );
}

export default CategoryShowcase;
