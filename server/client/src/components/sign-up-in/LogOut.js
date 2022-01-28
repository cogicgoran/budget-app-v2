import React from 'react';
import { logOut } from 'config/firebase-config';
import styles from './SignInSignUp.module.css';

function LogOut() {
  async function handleLogout(){
    try {
      await logOut();
    } catch (error) {
      alert("error while logging out");
    }
  }

  return (
    <div className={styles['form-container']}>
      <button type='button' onClick={handleLogout}>LOG OUT</button>
    </div>
  );
};

export default LogOut;
