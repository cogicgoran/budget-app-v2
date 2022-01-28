import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import styles from './UserLoggedDisplay.module.css';

function UserLoggedDisplay() {
  return (
    <div className={styles['display-user-logged']}>
      <FontAwesomeIcon icon={faCircleUser} />
    </div>
  );
};

export default UserLoggedDisplay;
