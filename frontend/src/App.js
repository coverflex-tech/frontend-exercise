import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import BenefitsList from "./pages/BenefitsList";

function App() {
  const [user, setUser] = useState();
  const [checkoutList, setCheckoutlist] = useState([]);
  const [benefits, setBenefits] = useState([]);

  const toggleBenefit = id => {
    setCheckoutlist(previousList => {
      const index = previousList.indexOf(id);
      if (index === -1) {
        return [...previousList, id];
      }

      return [...previousList.slice(0, index), ...previousList.slice(index + 1)];
    });
  };

  return (
    <Router>
      <div>
        {user && (
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
        )}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/products-list">
            {user ? (
              <BenefitsList
                benefits={benefits}
                setBenefits={setBenefits}
                toggleBenefit={toggleBenefit}
                checkoutList={checkoutList}
                user={user}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/checkout">
            {user ? <Checkout user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
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
