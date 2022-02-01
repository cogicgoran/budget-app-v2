import React, { useState } from 'react';
import { signUp } from 'config/firebase-config';
import { useAuth } from 'context/AuthContext';
import { validationSignUpSchema } from './SignInSignUp.validation';
import { Formik, Form, Field } from 'formik';
import styles from './SignInSignUp.module.css';
import ErrorInput from 'components/UI/error-input/ErrorInput';
import { useTranslation } from 'react-i18next';

function SignUp(props) {
  const { currentUser } = useAuth();
  const [ isLoading, setIsLoading ] = useState(false);
  const { t } = useTranslation();

  const textAlreadyHaveAnAccount = t('alreadyHaveAnAccount');
  const textSignInHere  = t('signInHere');
  const textSignUp  = t('signUp');
  const textPassword = t('password');
  const textEmail = t('email');

  async function handleSignUp(values){
    if( currentUser ) {
      return alert("You must logout first!")
    }
    setIsLoading(true);
    try {
      await signUp(values.email, values.password);
    } catch (error) {
      alert("error signing up");
    }
  };

  const inputClass = styles['form__input-wrapper'];
  const inputErrorClass = [styles['form__input-wrapper'],styles['invalid']].join(" ");

  return (
    <div className={styles['form-container']}>
      <Formik initialValues={{email:"", password:"", passwordConfirm:""}} validationSchema={validationSignUpSchema} onSubmit={handleSignUp}>
        {({touched, errors}) => (
          <Form className={styles['sign-up-form']}>
          <div className={touched.email && errors.email ? inputErrorClass : inputClass}>
            <Field id="sign-up-email" name="email" placeholder={`${textEmail}...`}></Field>
            {errors.email && touched.email && <ErrorInput errorMessage={errors.email}/>}
          </div>
          <div className={touched.password && errors.password ? inputErrorClass : inputClass}>
            <Field type="password" id="sign-up-password" name="password" placeholder={`${textPassword}...`}></Field>
            {errors.password && touched.password && <ErrorInput errorMessage={errors.password}/>}
          </div>
          <div className={touched.passwordConfirm && errors.passwordConfirm ? inputErrorClass : inputClass}>
            <Field type="password" id="passwordConfirm" name="passwordConfirm" placeholder={`${textPassword}...`}></Field>
            {errors.passwordConfirm && touched.passwordConfirm && <ErrorInput errorMessage={errors.passwordConfirm}/>}
          </div>
          <div className='form__controls'>
            <button disabled={isLoading} type='submit'>{textSignUp}</button>
          </div>
        </Form>)}
      </Formik>
        <div>
          {textAlreadyHaveAnAccount} <button onClick={props.onToggleForm}>{textSignInHere}</button>
        </div>
    </div>
  );
};

export default SignUp;
