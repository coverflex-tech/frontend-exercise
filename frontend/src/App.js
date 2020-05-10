import React from 'react';
import SessionProvider from './shared/contexts/session/SessionProvider';
import withSession from './shared/contexts/session/withSession';
import Header from './shared/components/header';
import {
  Browse,
  Login,
} from './pages';

import styles from './App.module.css';

const RoutedApp = withSession((props) => {
  if(!props.userName) {
    return (
      <Login />
    );
  } else {
    if (!props.userState || !props.userName) {
      return null;
    }
    
    const { userState: { user_id, data: { balance } }, userSignOut } = props;

    return (
      <>
        <Header userName={ user_id } balance={ balance } onSignOut={ userSignOut }/>
        <Browse className={ styles.app } />
      </>
    )
  }
});

const App = () => {
  return (
    <SessionProvider>
      <RoutedApp />
    </SessionProvider>
  );
}

export default App;
