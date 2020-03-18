import React from "react";
import { useHistory } from "react-router-dom";
import { Placeholder, Card, Header, Segment, Button } from "semantic-ui-react";

import Benefit from "./Benefit";
import ROUTES from "./routes";

const BenefitsList = ({
  user,
  toggleBenefit,
  checkoutList,
  benefitsLoading,
  benefits,
}) => {
  const history = useHistory();
  const goToCheckout = () => history.push(ROUTES.CHECKOUT);

  const currentExpense = checkoutList.reduce(
    (sum, id) => sum + benefits.find(benefit => benefit.id === id).price,
    0
  );

  const currentBalance = user.data.balance - currentExpense;

  const canGoToCheckout = checkoutList.length > 0;

  return (
    <React.Fragment>
      <Header as="h1">Welcome, {user.user_id}</Header>
      {benefitsLoading ? (
        <Placeholder>
          <Placeholder.Line />
        </Placeholder>
      ) : (
        <div className="App-header">
          <Header as="h2">Remaining balance: {currentBalance}€</Header>
          <Button disabled={!canGoToCheckout} primary onClick={goToCheckout}>
            Checkout
          </Button>
        </div>
      )}
      <Segment loading={benefitsLoading} placeholder>
        <Card.Group centered>
          {benefits.map(({ id, name, price }) => (
            <Benefit
              key={id}
              name={name}
              price={price}
              selected={checkoutList.includes(id)}
              availableToBuy={currentBalance >= price}
              toggleBenefit={() => toggleBenefit(id)}
              owned={user.data.product_ids.includes(id)}
            />
          ))}
        </Card.Group>
      </Segment>
    </React.Fragment>
  );
};

export default BenefitsList;
