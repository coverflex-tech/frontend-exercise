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
import store from 'store';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
