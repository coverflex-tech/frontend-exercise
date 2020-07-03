import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FetchUserDetails, Logout } from 'store/user/actionTypes';
import { useUserDetails } from 'store/user/selectors';

interface AuthContextType {
    isLoggingIn: boolean;
    userDetails?: UserState;
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
  const dispatch = useDispatch();
  const userDetails = useUserDetails();
  const { fetching, error } = userDetails;
  const logout = () => {
      dispatch(Logout());
  }

  const getUserDetails = useCallback((userName: string) => {
        dispatch(FetchUserDetails({ userName }))
    }, [dispatch]);

  return (
    <AuthContext.Provider value={{ 
        userDetails, 
        error: error ? 'Unable to login': undefined, 
        isLoggingIn: fetching, 
        getUserDetails, 
        logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
