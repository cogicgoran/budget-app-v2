import React from 'react';
import { useAuth } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';
import { PATHS } from 'App.constants';

function WithoutAuth(props) {
  const { currentUser } = useAuth();
  if(currentUser) {
    return <Navigate to={PATHS.HOME} />
  }else {
    return <props.component {...props.componentProps} />
  }
};

export default WithoutAuth;
