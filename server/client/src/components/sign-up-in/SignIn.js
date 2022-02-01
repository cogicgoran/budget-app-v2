import React, { useState } from 'react';
import { signIn } from 'config/firebase-config';
import { useAuth } from 'context/AuthContext';
import { validationSignInSchema } from './SignInSignUp.validation';
import { Formik, Form, Field } from 'formik';
import styles from './SignInSignUp.module.css';
import { signInWithGoogle, signInWithFacebook } from 'config/firebase-config';
import { SVGGoogle, SVGFacebook } from 'svg/svg';
import { useTranslation } from 'react-i18next';


function SignIn(props) {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [ isLoading, setIsLoading] = useState(false);

  const textEmail = t('email');
  const textPassword = t('password');
  const textOr = t('or');
  const textSignIn = t('signIn');
  const textSignInWith = t('signInWith');
  const textDontHaveAnAccount = t('dontHaveAnAccount');
  const textSignUpHere = t('signUpHere');


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
      await signInWithGoogle();
    } catch (error) {
      alert("error logging with google account");
    }
  }

  async function handleSignInWithFacebook(){
    try {
      await signInWithFacebook();
    } catch (error) {
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
            <Field id="sign-in-email" name="email" placeholder={`${textEmail}...`} />
          </div>
          <div className={touched.password && errors.password ? inputErrorClass : inputClass}>
            <Field type="password" id="sign-in-password" name="password" placeholder={`${textPassword}...`} />
          </div>
          <div className={styles['form__controls']}>
            <button disabled={isLoading} type='submit'>{textSignIn}</button>
          </div>
        </Form>)}
      </Formik>
      <div>
        {textOr}
      </div>
      <div className={styles["login-via-service-wrapper"]}>
        <button className={styles["login-via-service-btn"]} onClick={handleSignInWithGoogle}><SVGGoogle/><span>{textSignInWith} Google</span></button>
        <button className={styles["login-via-service-btn"]} onClick={handleSignInWithFacebook}><SVGFacebook/><span>{textSignInWith} Facebook</span></button>
      </div>
      <div>
      {textDontHaveAnAccount} <br /> <button onClick={() => {props.onToggleForm(prevState => !prevState)}}>{textSignUpHere}</button>
      </div>
    </div>
  );
};

export default SignIn;
