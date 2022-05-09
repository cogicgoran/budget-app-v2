import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import AddCategory from "components/categories/add-category/AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backdrop from "components/UI/backdrop/Backdrop";
import CategoryContextProvider from "context/categories/CategoryContext";
import { useAuth } from "context/AuthContext";
import  "./Categories.css";
import { useHttp } from "hooks/useHttp";
import * as fontAwesomeSolidIcons from "@fortawesome/free-solid-svg-icons";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Categories() {
  const { t } = useTranslation();
  const textCategories = t("categories");
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState(null);
  console.log(currentUser.accessToken);
  const { isLoading, error, fetchTask } = useHttp();

  console.log(categories);

  useEffect(() => {
    console.log("should be making the call");
    function handleData(response) {
      setCategories(response.data);
    }

    fetchTask(
      {
        url: "http://localhost:8000/api/categories",
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      },
      handleData
    );
  }, []);

  return (
    <div className='categories'>
      <h2>{textCategories}</h2>
      <div className="category-container">
        {categories && categories.map((category) => {
          return (
            <div style={{borderColor: category.color_border}} className="category-wrapper">
              <div style={{color: category.color_main}} className="category__icon">
                <FontAwesomeIcon icon={fontAwesomeSolidIcons[category.icon_name]} />
              </div>
              <div style={{backgroundColor: category.color_main, borderColor: category.color_border}} className="category__name">{category.name}</div>
            </div>
          );
        })}
      </div>
      <div className="category-add-btn">
        <FontAwesomeIcon
          icon={solid("circle-plus")}
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
