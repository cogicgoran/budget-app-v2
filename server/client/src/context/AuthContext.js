import React, { useState, createContext, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'App.constants';

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) navigate(PATHS.HOME);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>
      {props.children}
    </AuthContext.Provider>
  )
};
