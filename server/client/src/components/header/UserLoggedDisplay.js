import React, { useState } from "react";
import { logOut } from "config/firebase-config";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserLoggedDisplay.module.css";


function UserLoggedDisplay() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();

  const textLogout = t('logout')

  async function handleLogout() {
    try {
      await logOut();
    } catch (error) {
      alert("error while logging out");
    }
  }

  function handleDropdownClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setShowDropdown((prevState) => !prevState);
  }

  return (
    <div onClick={(event) => {event.preventDefault()}}>
      <div
        className={styles["display-user-logged"]}
      >
        <div onClick={handleDropdownClick}>
          <FontAwesomeIcon
            className={styles["display-user-icon"]}
            icon={faCircleUser}
            
          />
          <FontAwesomeIcon
            className={styles["display-user-arrow"]}
            icon={faChevronDown}
          />
        </div>
        {showDropdown && (
          <div className={styles["display-user-dropdown"]}>
            <div onClick={handleLogout}>{textLogout}</div>
          </div>
        )}
      </div>
      {showDropdown && (
        <div
          className={styles["dropdown-bg"]}
          onClick={handleDropdownClick}
        ></div>
      )}
    </div>
  );
}

export default UserLoggedDisplay;
