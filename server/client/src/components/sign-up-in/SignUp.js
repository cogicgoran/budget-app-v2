import React, { useState } from 'react';
import { signUp } from 'config/firebase-config';
import { useAuth } from 'context/AuthContext';
import { validationSignUpSchema } from './SignInSignUp.validation';
import { Formik, Form, Field } from 'formik';
import styles from './SignInSignUp.module.css';
import ErrorInput from 'components/UI/error-input/ErrorInput';

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
    <div className={styles['form-container']}>
      <Formik initialValues={{email:"", password:"", passwordConfirm:""}} validationSchema={validationSignUpSchema} onSubmit={handleSignUp}>
        {({touched, errors}) => (
          <Form className={styles['sign-up-form']}>
          <div className={touched.email && errors.email ? inputErrorClass : inputClass}>
            <Field id="sign-up-email" name="email" placeholder="example@example.com"></Field>
            {errors.email && touched.email && <ErrorInput errorMessage={errors.email}/>}
          </div>
          <div className={touched.password && errors.password ? inputErrorClass : inputClass}>
            <Field type="password" id="sign-up-password" name="password" placeholder="Password..."></Field>
            {errors.password && touched.password && <ErrorInput errorMessage={errors.password}/>}
          </div>
          <div className={touched.passwordConfirm && errors.passwordConfirm ? inputErrorClass : inputClass}>
            <Field type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Password..."></Field>
            {errors.passwordConfirm && touched.passwordConfirm && <ErrorInput errorMessage={errors.passwordConfirm}/>}
          </div>
          <div className='form__controls'>
            <button disabled={isLoading} type='submit'>Sign up</button>
          </div>
        </Form>)}
      </Formik>
        <div>
          Already have an account? <button onClick={props.onToggleForm}>Sign In Here</button>
        </div>
    </div>
  );
};

export default SignUp;
