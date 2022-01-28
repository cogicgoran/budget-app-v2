import React from 'react';
import { useAuth } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';
import { PATHS } from 'App.constants';

function WithAuth(props) {
  const { currentUser } = useAuth();
  if(!currentUser) {
    return <Navigate to={PATHS.SIGN_IN} />
  }else {
    return <props.component {...props.componentProps} />
  }
};

export default WithAuth;
