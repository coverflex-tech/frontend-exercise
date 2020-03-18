import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import BenefitsList from "./BenefitsList";
import Checkout from "./Checkout";
import { getUser } from "../api/users";
import { postOrder } from "../api/orders";
import { getProducts } from "../api/products";
import ROUTES from "./routes";

function App() {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(false);

  const [checkoutList, setCheckoutlist] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [benefits, setBenefits] = useState([]);
  const [benefitsLoading, setBenefitsLoading] = useState(false);

  const loadProductsCatalog = () => {
    setBenefitsLoading(true);

    getProducts()
      .then(benefits => setBenefits(benefits))
      .finally(() => setBenefitsLoading(false));
  };

  useEffect(loadProductsCatalog, []);

  const toggleBenefit = id => {
    setCheckoutlist(previousList => {
      const index = previousList.indexOf(id);
      const benefitSelected = index !== -1;

      if (benefitSelected) {
        return [...previousList.slice(0, index), ...previousList.slice(index + 1)];
      } else {
        return [...previousList, id];
      }
    });
  };

  const getUserData = async username => {
    setUserLoading(true);

    try {
      const user = await getUser(username);
      setUser(user);
    } finally {
      setUserLoading(false);
    }
  };

  const placeOrder = async () => {
    setCheckoutLoading(true);

    try {
      await postOrder(checkoutList, user.user_id);
      await getUserData(user.user_id);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          {user && (
            <React.Fragment>
              <Route path={ROUTES.BENEFITS_LIST}>
                <BenefitsList
                  benefitsLoading={benefitsLoading}
                  benefits={benefits}
                  toggleBenefit={toggleBenefit}
                  checkoutList={checkoutList}
                  user={user}
                />
              </Route>
              <Route path={ROUTES.CHECKOUT}>
                <Checkout
                  placeOrder={placeOrder}
                  checkoutLoading={checkoutLoading}
                  benefitsLoading={benefitsLoading}
                  user={user}
                  benefits={benefits}
                  checkoutList={checkoutList}
                />
              </Route>
            </React.Fragment>
          )}
          <Route path={ROUTES.LOGIN}>
            <Login getUser={getUserData} userLoading={userLoading} />
          </Route>
          <Route path="/">
            <Redirect to={ROUTES.LOGIN} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
