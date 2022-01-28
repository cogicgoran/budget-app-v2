import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './SignInSignUp.module.css';
import { useAuth } from 'context/AuthContext';
import SignIn from 'components/sign-up-in/SignIn';
import SignUp from 'components/sign-up-in/SignUp';
import LogOut from 'components/sign-up-in/LogOut';

function SignInSignUp() {
  const { currentUser } = useAuth();
  const [ toggleSignUp, setToggleSignUp] = useState(false);

  return (
    <div className={styles['sign-up-in-container']}>
      {currentUser && <LogOut /> }
      {!currentUser && !toggleSignUp && <SignIn onToggleForm={() => setToggleSignUp(prevState => !prevState)} />}
      {!currentUser && toggleSignUp && <SignUp onToggleForm={() => setToggleSignUp(prevState => !prevState)}/>}
    </div>
  );
};

export default SignInSignUp;