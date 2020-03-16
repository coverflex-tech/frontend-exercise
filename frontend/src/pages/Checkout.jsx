import React from "react";

import { useHistory } from "react-router-dom";
import { Placeholder, Card, Header, Button, Grid } from "semantic-ui-react";

const Checkout = ({
  user,
  checkoutList,
  benefits,
  checkoutLoading,
  benefitsLoading,
  placeOrder,
}) => {
  const history = useHistory();

  const currentExpense = checkoutList.reduce(
    (acc, id) => acc + benefits.find(benefit => benefit.id === id).price,
    0
  );

  const currentBalance = user.data.balance - currentExpense;

  return (
    <div>
      <Header as="h1">Welcome, {user.user_id}</Header>
      {benefitsLoading ? (
        <Placeholder>
          <Placeholder.Line />
        </Placeholder>
      ) : (
        <Grid>
          <Grid.Column floated="left" width={5}>
            <Header as="h2">Remaining balance: {currentBalance}€</Header>
          </Grid.Column>
          <Grid.Column floated="right" width={1}>
            <Button onClick={() => history.goBack()}>
              <Button.Content hidden>Back</Button.Content>
            </Button>
          </Grid.Column>
        </Grid>
      )}
      <Card.Group
        items={benefits
          .filter(({ id }) => checkoutList.includes(id))
          .map(({ name, price }) => ({
            header: name,
            description: `${price}€`,
          }))}
      ></Card.Group>
      <Header as="h3">Total: {currentExpense}€</Header>
      <Button
        loading={checkoutLoading}
        primary
        onClick={() => placeOrder().then(() => history.push("/products-list"))}
      >
        Place order
      </Button>
    </div>
  );
};

export default Checkout;
