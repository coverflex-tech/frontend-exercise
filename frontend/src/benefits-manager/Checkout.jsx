import React from "react";

import { useHistory } from "react-router-dom";
import { Placeholder, Card, Header, Button } from "semantic-ui-react";
import ROUTES from "./routes";

const Checkout = ({
  user,
  checkoutList,
  benefits,
  checkoutLoading,
  benefitsLoading,
  placeOrder,
}) => {
  const history = useHistory();
  const goToBenefitsList = () => history.push(ROUTES.BENEFITS_LIST);

  const currentExpense = checkoutList.reduce(
    (sum, id) => sum + benefits.find(benefit => benefit.id === id).price,
    0
  );

  const currentBalance = user.data.balance - currentExpense;

  const selctedBenefits = benefits.filter(({ id }) => checkoutList.includes(id));

  const benefitsMappedForCard = selctedBenefits.map(({ name, price }) => ({
    header: name,
    description: `${price}€`,
  }));

  return (
    <div>
      <Header as="h1">Welcome, {user.user_id}</Header>
      {benefitsLoading ? (
        <Placeholder>
          <Placeholder.Line />
        </Placeholder>
      ) : (
        <div className="App-header">
          <Header as="h2">Remaining balance: {currentBalance}€</Header>
          <Button onClick={() => history.goBack()}>
            <Button.Content hidden>Back</Button.Content>
          </Button>
        </div>
      )}
      <Card.Group items={benefitsMappedForCard}></Card.Group>
      <Header as="h3">Total: {currentExpense}€</Header>
      <Button
        loading={checkoutLoading}
        primary
        onClick={() => placeOrder().then(goToBenefitsList)}
      >
        Place order
      </Button>
    </div>
  );
};

export default Checkout;
