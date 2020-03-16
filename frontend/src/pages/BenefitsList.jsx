import React from "react";
import { useHistory } from "react-router-dom";
import { Placeholder, Card, Header, Segment, Button } from "semantic-ui-react";

import Benefit from "./Benefit";

const BenefitsList = ({
  user,
  toggleBenefit,
  checkoutList,
  benefitsLoading,
  benefits,
}) => {
  const history = useHistory();

  const currentExpense = checkoutList.reduce(
    (acc, id) => acc + benefits.find(benefit => benefit.id === id).price,
    0
  );

  const currentBalance = user.data.balance - currentExpense;

  return (
    <React.Fragment>
      <Header as="h1">Welcome, {user.user_id}</Header>
      {benefitsLoading ? (
        <Placeholder>
          <Placeholder.Line />
        </Placeholder>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Header as="h2" style={{ marginBottom: ".5em" }}>
            Remaining balance: {currentBalance}€
          </Header>
          {checkoutList.length > 0 && (
            <Button onClick={() => history.push("/checkout")}>
              <Button.Content hidden>Checkout</Button.Content>
            </Button>
          )}
        </div>
      )}
      <Segment loading={benefitsLoading} placeholder>
        <Card.Group centered>
          {benefits.map(({ id, name, price }) => (
            <Benefit
              owned={user.data.product_ids.includes.id}
              selected={checkoutList.includes(id)}
              toggleBenefit={() => toggleBenefit(id)}
              id={id}
              name={name}
              price={price}
              key={id}
              availableToBuy={currentBalance >= price}
            />
          ))}
        </Card.Group>
      </Segment>
    </React.Fragment>
  );
};

export default BenefitsList;
