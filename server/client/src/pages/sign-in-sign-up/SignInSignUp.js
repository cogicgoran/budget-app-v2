import React, { useState } from 'react';
import styles from './SignInSignUp.module.css';
import SignIn from 'components/sign-up-in/SignIn';
import SignUp from 'components/sign-up-in/SignUp';

function SignInSignUp() {
  const [ toggleSignUp, setToggleSignUp] = useState(false);

  return (
    <div className={styles['sign-up-in-container']}>
      {!toggleSignUp && <SignIn onToggleForm={() => setToggleSignUp(prevState => !prevState)} />}
      {toggleSignUp && <SignUp onToggleForm={() => setToggleSignUp(prevState => !prevState)}/>}
    </div>
  );
};

export default SignInSignUp;