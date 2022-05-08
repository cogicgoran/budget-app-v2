import React, { useState, useEffect } from "react";
import styles from "./Categories.module.css";
import { useTranslation } from "react-i18next";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import AddCategory from "components/categories/add-category/AddCategory";
import categoryStyleSheet from "helper/categoriesObject.const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backdrop from "components/UI/backdrop/Backdrop";
import CategoryContextProvider from "context/categories/CategoryContext";
import { useAuth } from "context/AuthContext";
import axios from "axios";

function Categories() {
  const { t } = useTranslation();
  const textCategories = t("categories");
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();
  console.log(currentUser.accessToken);

  useEffect(() => {
    console.log("should be making the call");
    const getCategories = async () => {
      await axios.get('http://localhost:8000/api/categories', {
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`
        }
      });
    }
    getCategories();
  }, []);

  return (
    <div className={styles.categories}>
      <h2>{textCategories}</h2>
      <div className={styles["category-container"]}>
        <div className={styles["category-wrapper"]}>
          <div className={styles["category__icon"]}>
            <FontAwesomeIcon icon={categoryStyleSheet.food.icon} />
          </div>
          <div className={styles["category__name"]}>FOOD</div>
        </div>
        <div className={styles["category-wrapper"]}>
          <div className={styles["category__icon"]}>
            <FontAwesomeIcon icon={categoryStyleSheet[3].icon} />
          </div>
          <div className={styles["category__name"]}>FOOD</div>
        </div>
      </div>
      <div className={styles["category-add-btn"]}>
        <FontAwesomeIcon
          icon={faCirclePlus}
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>
      {showModal &&
        createPortal(
          <CategoryContextProvider>
            <AddCategory onCancel={() => setShowModal(false)} />
          </CategoryContextProvider>,
          document.getElementById("overlay-root")
        )}
      {showModal &&
        createPortal(
          <Backdrop onCancel={() => setShowModal(false)} />,
          document.getElementById("backdrop-root")
        )}
    </div>
  );
}

export default Categories;
