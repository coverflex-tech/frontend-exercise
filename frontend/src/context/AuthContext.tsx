import React, { useState } from 'react';
import userLogin from 'services/api/user/userLogin';

interface AuthContextType {
    isLoggingIn: boolean;
    userDetails?: UserDetails;
    error?: string;
    login: (userName: string) => void;
    logout: () => void;
}
const AuthContext = React.createContext<AuthContextType>({
    isLoggingIn: false,
    login: () => {},
    logout: () => {},
});

AuthContext.displayName = 'AuthContext';

export const AuthContextProvider: React.FC = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [isLoggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState<string>();

  const logout = () => {
      setUserDetails(undefined);
  }

  const login = async (userName: string) => {
    setLoggingIn(true);
    try {
        const userDetails = (await userLogin({ userName })).data;
        setUserDetails(userDetails);
    } catch {
        setError('Unable to perform login');
    } finally {
        setLoggingIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userDetails, error, isLoggingIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
