import React from "react";
import { Card, Button } from "semantic-ui-react";

const Benefit = ({ id, name, price, selected, availableToBuy, toggleBenefit, owned }) => {
  const renderButton = () => {
    if (owned) {
      return (
        <Button disabled basic color="green">
          Owned
        </Button>
      );
    }
    if (selected) {
      return (
        <Button onClick={toggleBenefit} basic>
          Unselect
        </Button>
      );
    }

    if (availableToBuy) {
      return (
        <Button onClick={toggleBenefit} basic color="green">
          Select benefit
        </Button>
      );
    }

    return (
      <Button basic disabled color="red">
        No funds available
      </Button>
    );
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{price}€</Card.Description>
      </Card.Content>
      <Card.Content extra>{renderButton()}</Card.Content>
    </Card>
  );
};

export default Benefit;
