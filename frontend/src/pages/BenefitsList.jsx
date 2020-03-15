import React, { useState, useEffect } from "react";
import { Placeholder, Card, Header, Segment } from "semantic-ui-react";
import { getProducts } from "../api/products";
import Benefit from "./Benefit";

const BenefitsList = ({ user, toggleBenefit, checkoutList, setBenefits, benefits }) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentExpense = checkoutList.reduce(
    (acc, id) => acc + benefits.find(benefit => benefit.id === id).price,
    0
  );

  const currentBalance = user.data.balance - currentExpense;

  useEffect(() => {
    setIsLoading(true);
    getProducts().then(benefits => {
      setIsLoading(false);
      setBenefits(benefits);
    });
  }, [setBenefits]);

  return (
    <div>
      <Header as="h1">Welcome, {user.user_id}</Header>
      {isLoading ? (
        <Placeholder>
          <Placeholder.Line />
        </Placeholder>
      ) : (
        <Header as="h2">Current balance: {currentBalance}€</Header>
      )}
      <Segment loading={isLoading} style={{ paddingHorizontal: "40px" }} placeholder>
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
    </div>
  );
};

export default BenefitsList;
