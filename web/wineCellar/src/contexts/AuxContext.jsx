import { useContext, createContext, useState, useEffect } from 'react';
import { profile } from '../services/ApiService.js';
import { useNavigate } from 'react-router';

const AuthContext = createContext();
const isLocationProtected = !/^\/login$|^\/$|^\/registration$/.test(
  window.location.pathname
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then((data) => setUser(data))
      .catch(() => {
        setUser(null);
        console.log('wtf');
        if (isLocationProtected) navigate('/login');
      });
  }, [navigate]);

  function login(user) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  const contextData = {
    user,
    login,
    logout,
  };

  if (user === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
