import React, { useState } from 'react';
import { signUp } from 'config/firebase-config';
import { useAuth } from 'context/AuthContext';
import { validationSignUpSchema } from './SignInSignUp.validation';
import { Formik, Form, Field } from 'formik';
import styles from './SignInSignUp.module.css';

function SignUp(props) {
  const { currentUser } = useAuth();
  const [ isLoading, setIsLoading ] = useState(false);

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
    <div>
      <h3>Sign Up</h3>
      <Formik initialValues={{email:"", password:"", passwordConfirm:""}} validationSchema={validationSignUpSchema} onSubmit={handleSignUp}>
        {({touched, errors}) => (
          <Form className={styles['sign-up-form']}>
          <div className={touched.email && errors.email ? inputErrorClass : inputClass}>
            <label htmlFor="sign-up-email">E-mail:</label>
            <Field id="sign-up-email" name="email"></Field>
          </div>
          <div className={touched.password && errors.password ? inputErrorClass : inputClass}>
            <label htmlFor="sign-up-password">Password:</label>
            <Field type="password" id="sign-up-password" name="password"></Field>
          </div>
          <div className={touched.passwordConfirm && errors.passwordConfirm ? inputErrorClass : inputClass}>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <Field type="password" id="passwordConfirm" name="passwordConfirm"></Field>
          </div>
          <div className='form__controls'>
            <button disabled={isLoading} type='submit'>REGISTER</button>
          </div>
        </Form>)}
      </Formik>
        <div>
          Already have an account? <button onClick={props.onToggleForm}>Sign In</button>
        </div>
    </div>
  );
};

export default SignUp;
