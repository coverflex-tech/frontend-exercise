import React from 'react';
import ThemeProvider from 'components/ThemeProvider';
import Login from 'pages/Login';
import { AuthContextProvider } from 'context/AuthContext';
import { 
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Overview from 'pages/Overview';
import PrivateRoute from 'components/PrivateRoute';

const App = () => (
  <ThemeProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/' exact component={Overview} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
