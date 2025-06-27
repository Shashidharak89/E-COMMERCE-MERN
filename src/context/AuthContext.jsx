import { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // { name, email, _id }
  const [token, setToken] = useState(null);

  const loginUser = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('token', tokenData);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
