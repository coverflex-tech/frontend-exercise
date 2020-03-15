import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import ProductsList from "./pages/ProductsList";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/products-list">products-list</Link>
            </li>
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
            <li>
              <Link to="/login">Switch user</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/products-list">
            <ProductsList />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Checkout() {
  return <h2>Checkout</h2>;
}

export default App;
