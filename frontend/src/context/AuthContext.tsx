import React, { useState } from 'react';
import userLogin from 'services/api/user/userLogin';

interface AuthContextType {
    isLoggingIn: boolean;
    userDetails?: UserDetails;
    error?: string;
    getUserDetails: (userName: string) => void;
    logout: () => void;
}
const AuthContext = React.createContext<AuthContextType>({
    isLoggingIn: false,
    getUserDetails: () => {},
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

  const getUserDetails = async (userName: string) => {
    setLoggingIn(true);
    try {
        const details = (await userLogin({ userName })).data;
        setUserDetails(details);
    } catch {
        setError('Unable to perform login');
    } finally {
        setLoggingIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userDetails, error, isLoggingIn, getUserDetails, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
