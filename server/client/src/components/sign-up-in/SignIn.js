import React, { useState } from 'react';
import { signIn } from 'config/firebase-config';
import { useAuth } from 'context/AuthContext';
import { validationSignInSchema } from './SignInSignUp.validation';
import { Formik, Form, Field } from 'formik';
import styles from './SignInSignUp.module.css';
import { signInWithGoogle, signInWithFacebook } from 'config/firebase-config';

function SignIn(props) {
  const { currentUser } = useAuth();
  const [ isLoading, setIsLoading] = useState(false);

  async function handleSignIn(values){
    if( currentUser ) {
      return alert("You must logout first!")
    }
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      alert("error signing up");
    }
  };

  async function handleSignInWithGoogle(){
    try {
      const result = await signInWithGoogle();
      console.log(result);
    } catch (error) {
      alert("error logging with google account");
    }
  }

  async function handleSignInWithFacebook(){
    try {
      const result = await signInWithFacebook();
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("error logging with facebook account");
    }
  }

  const inputClass = styles['form__input-wrapper'];
  const inputErrorClass = [styles['form__input-wrapper'],styles['invalid']].join(" ");

  return (
    <div>
      <Formik initialValues={{email:"", password:""}}  validationSchema={validationSignInSchema} onSubmit={handleSignIn}>
        {({touched, errors}) => (
          <Form className={styles['sign-in-form']}>
            <h3>Sign In</h3>
          <div className={touched.email && errors.email ? inputErrorClass : inputClass}>
            <label htmlFor="sign-in-email">E-mail:</label>
            <Field id="sign-in-email" name="email"></Field>
          </div>
          <div className={touched.password && errors.password ? inputErrorClass : inputClass}>
            <label htmlFor="sign-in-password">Password:</label>
            <Field type="password" id="sign-in-password" name="password"></Field>
          </div>
          <div className='form__controls'>
            <button disabled={isLoading} type='submit'>LOG IN</button>
          </div>
          {/* {isFetched && !isLoading && error && <div>{error.message}</div> } */}
        </Form>)}
      </Formik>
      <div>
        <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
        <button onClick={handleSignInWithFacebook}>Sign In with Facebook</button>
      </div>
      <div>
       Dont have an account? <button onClick={() => {props.onToggleForm(prevState => !prevState)}}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignIn;
