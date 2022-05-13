import React from "react";
import styles from "./AddCategory.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useCategoryContext,
} from "context/categories/CategoryContext";

import CategoryColor from "./category-color/CategoryColor";
import CategoryIcon from "./category-icon/CategoryIcon";
import { useHttp } from "hooks/useHttp";
import { ToastNotificationError, ToastNotificationSuccess } from "context/notification/NotificationClasses";
import { useNotification } from "context/notification/NotificationContext";

function AddCategory(props) {
  const { isIconCategoryToggled, categoryValue, categoryColorState, categoryIconState } = useCategoryContext();
  const { error, fetchTask, isLoading } = useHttp();
  const { createNotification } = useNotification();

  const formSubmit = async () => {
    const name = categoryValue;
    const color = categoryColorState.value.color;
    const borderColor = categoryColorState.value.borderColor;
    const icon = categoryIconState.value;

    const formData = {
      name, icon_name: icon,
      color_main: color,
      color_border: borderColor
    }
    // TODO: VALIDATE INPUTS
    fetchTask({
      url:'http://localhost:8000/api/categories',
      method: 'POST',
      data: formData
    }, handleResponse)

    function handleResponse(response) {
      if(response.status === 201) {
        createNotification(new ToastNotificationSuccess('Success', 'Successfully added category'))
        props.onAddCategory();
      } else {
        createNotification(new ToastNotificationError('smth', 'else'))
      }
    }
  }

  return (
    <div className={styles["add-category-container"]}>
      <CategoryColor onCancel={props.onCancel} onSubmit={formSubmit} />
      {isIconCategoryToggled && <CategoryIcon />}
    </div>
  );
}

export default AddCategory;
