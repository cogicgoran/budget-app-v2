import React,{useState} from "react";
import styles from "./AddCategory.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CategoryColor from "./category-color/CategoryColor";
import CategoryIcon from "./category-icon/CategoryIcon";
function AddCategory(props) {
  const [currentIcon, setCurrentIcon] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);

  return (
    <div className={styles["add-category-container"]}>
      <CategoryColor currentIcon={currentIcon} currentColor={currentColor} setCurrentColor={setCurrentColor} onCancel={props.onCancel}/>
      <CategoryIcon currentIcon={currentIcon} currentColor={currentColor} setCurrentIcon={setCurrentIcon}/>
    </div>
  );
}

export default AddCategory;
