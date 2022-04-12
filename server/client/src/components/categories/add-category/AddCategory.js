import React, { useState } from "react";
import styles from "./AddCategory.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryContextProvider from "context/categories/CategoryContext";

import CategoryColor from "./category-color/CategoryColor";
import CategoryIcon from "./category-icon/CategoryIcon";

function AddCategory(props) {
  const [currentIcon, setCurrentIcon] = useState(null);

  return (
    <CategoryContextProvider>
      <div className={styles["add-category-container"]}>
        <CategoryColor
          currentIcon={currentIcon}
          onCancel={props.onCancel}
        />
        <CategoryIcon
          currentIcon={currentIcon}
          setCurrentIcon={setCurrentIcon}
        />
      </div>
    </CategoryContextProvider>
  );
}

export default AddCategory;
