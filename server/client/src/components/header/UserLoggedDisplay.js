import React from 'react';
import { logOut } from 'config/firebase-config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './UserLoggedDisplay.module.css';

function UserLoggedDisplay() {
  async function handleLogout(){
    try {
      await logOut();
    } catch (error) {
      alert("error while logging out");
    }
  }

  return (
    <div className={styles['display-user-logged']}>
      <div>
        <FontAwesomeIcon className={styles['display-user-icon']} icon={faCircleUser} />
        <FontAwesomeIcon className={styles['display-user-arrow']} icon={faChevronDown} />
      </div>
      <div className={styles['display-user-dropdown']}>
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
};

export default UserLoggedDisplay;
