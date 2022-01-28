import React, { useState } from 'react';
import { signIn } from 'config/firebase-config';
import { useAuth } from 'context/AuthContext';
import { validationSignInSchema } from './SignInSignUp.validation';
import { Formik, Form, Field } from 'formik';
import styles from './SignInSignUp.module.css';
import { signInWithGoogle, signInWithFacebook } from 'config/firebase-config';
import { SVGGoogle, SVGFacebook } from 'svg/svg';


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
    <div className={styles['form-container']}>
      <Formik initialValues={{email:"", password:""}}  validationSchema={validationSignInSchema} onSubmit={handleSignIn}>
        {({touched, errors}) => (
          <Form className={styles['sign-in-form']}>
          <div className={touched.email && errors.email ? inputErrorClass : inputClass}>
            <Field id="sign-in-email" name="email" placeholder="Email..." />
          </div>
          <div className={touched.password && errors.password ? inputErrorClass : inputClass}>
            <Field type="password" id="sign-in-password" name="password" placeholder="Mos de passe..." />
          </div>
          <div className={styles['form__controls']}>
            <button disabled={isLoading} type='submit'>Sign in</button>
          </div>
        </Form>)}
      </Formik>
      <div>
        Or
      </div>
      <div className={styles["login-via-service-wrapper"]}>
        <button className={styles["login-via-service-btn"]} onClick={handleSignInWithGoogle}><SVGGoogle/><span>Sign in with Google</span></button>
        <button className={styles["login-via-service-btn"]} onClick={handleSignInWithFacebook}><SVGFacebook/><span>Sign in with Facebook</span></button>
      </div>
      <div>
       Dont have an account? <button onClick={() => {props.onToggleForm(prevState => !prevState)}}>Sign Up Here</button>
      </div>
    </div>
  );
};

export default SignIn;
