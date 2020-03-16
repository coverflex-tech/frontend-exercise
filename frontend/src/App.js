import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import BenefitsList from "./pages/BenefitsList";
import Checkout from "./pages/Checkout";
import { getUser } from "./api/users";
import { postOrder } from "./api/orders";
import { getProducts } from "./api/products";

function App() {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState();

  const [checkoutList, setCheckoutlist] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [benefits, setBenefits] = useState([]);
  const [benefitsLoading, setBenefitsLoading] = useState(false);

  useEffect(() => {
    setBenefitsLoading(true);

    getProducts()
      .then(benefits => setBenefits(benefits))
      .finally(() => setBenefitsLoading(false));
  }, []);

  const toggleBenefit = id => {
    setCheckoutlist(previousList => {
      const index = previousList.indexOf(id);
      if (index === -1) {
        return [...previousList, id];
      }

      return [...previousList.slice(0, index), ...previousList.slice(index + 1)];
    });
  };

  const getUserData = username => {
    setUserLoading(true);

    return getUser(username)
      .then(user => setUser(user))
      .finally(() => setUserLoading(false));
  };

  const placeOrder = () => {
    setCheckoutLoading(true);

    return postOrder(checkoutList, user.user_id)
      .then(() => getUserData(user.user_id))
      .finally(() => setCheckoutLoading(false));
  };

  return (
    <Router>
      <div style={{ paddingLeft: "3em", paddingRight: "3em" }}>
        <Switch>
          <Route path="/benefits-list">
            {user ? (
              <BenefitsList
                benefitsLoading={benefitsLoading}
                benefits={benefits}
                toggleBenefit={toggleBenefit}
                checkoutList={checkoutList}
                user={user}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/checkout">
            {user ? (
              <Checkout
                placeOrder={placeOrder}
                checkoutLoading={checkoutLoading}
                benefitsLoading={benefitsLoading}
                user={user}
                benefits={benefits}
                checkoutList={checkoutList}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            <Login getUser={getUserData} userLoading={userLoading} />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
