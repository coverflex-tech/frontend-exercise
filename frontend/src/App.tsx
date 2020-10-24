import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";

import { ProductCalatog, SignIn } from "./screens";
import { StoreState, User } from "./store";

interface AppProps {
  user?: User;
}

class AppComponent extends React.Component<AppProps, {}> {
  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>{user && `${user.username} - ${user.balance}`}</li>
              <li>
                <Link to="/products">Catalog</Link>
              </li>
              <li>
                <Link to="/checkout">Shopping Cart</Link>
              </li>
            </ul>

            <hr />

            <Switch>
              <Route exact path="/">
                <Redirect
                  to={{
                    pathname: "/sign-in",
                  }}
                />
              </Route>
              <Route path="/products">
                <ProductCalatog />
              </Route>
              <Route path="/sign-in">
                <SignIn />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(AppComponent);
