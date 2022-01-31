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
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
      if (user) navigate(PATHS.HOME);
    });

    return unsubscribe;
  }, []);

  if (pending) {
    return <div>Pending authentication...</div>
  }

  return (
    <AuthContext.Provider value={{currentUser}}>
      {props.children}
    </AuthContext.Provider>
  )
};
