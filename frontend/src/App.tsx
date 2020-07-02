import React from 'react';
import ThemeProvider from 'components/ThemeProvider';
import Login from 'pages/Login';
import { AuthContextProvider } from 'context/AuthContext';

const App = () => (
  <ThemeProvider>
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
