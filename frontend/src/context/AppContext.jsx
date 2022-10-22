import React, { useState } from 'react'
import Theme from '../themes/light'
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppContext = React.createContext();
AppContext.displayName = 'AppContext'

function AppProvider(props) {

  const [user, setUserInternal] = useLocalStorage('user')
  const [shoppingCart, setShoppingCart] = useLocalStorage('shoppingCart')
  const [theme, setTheme] = useState(Theme);
  
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    setShoppingCart([])
    navigate("/", { replace: true });
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setShoppingCart([])
    navigate("/login", { replace: true });
  };

  const setUser = (user) => {
      setUserInternal(user)
  }

  const updateUserData = (user) => {
    setUserInternal(user)
}
  

  const value = {
    //we can have several themes
    theme,
    setTheme,

    user,

    login, logout, updateUserData,

    shoppingCart,
    setShoppingCart
  }

  return <AppContext.Provider value={value} {...props} />
}

function useAppContext() {
  const context = React.useContext(AppContext)
  if (context === undefined) { throw new Error('Context error') }
  else { return context }
}

export { AppProvider, useAppContext }