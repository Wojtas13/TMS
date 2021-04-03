import React from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  setAuth: () => {},
});

export const useAuth = () => React.useContext(AuthContext);
