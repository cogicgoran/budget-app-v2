import React from 'react';
import { logOut } from 'config/firebase-config';

function LogOut() {
  async function handleLogout(){
    try {
      await logOut();
    } catch (error) {
      alert("error while logging out");
    }
  }

  return (
    <div>
      <button type='button' onClick={handleLogout}>LOG OUT</button>
    </div>
  );
};

export default LogOut;
