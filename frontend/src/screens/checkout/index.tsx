import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { StoreState, Product, removeProductFromCart } from "../../store";

interface CheckoutProps {
  shoppingCart: Product[];
  removeCartItem: (itemId: string) => void;
}

class CheckoutComponent extends React.Component<CheckoutProps, {}> {
  render() {
    const { shoppingCart, removeCartItem } = this.props;

    const cartTotal = shoppingCart.reduce((acc, cartItem) => {
      return acc + cartItem.price;
    }, 0);

    return (
      <>
        <h1 style={{ marginBottom: "32px" }}>Checkout</h1>
        {shoppingCart.length === 0 && <h6>The cart is empty!</h6>}
        {shoppingCart.length > 0 && (
          <>
            <ListGroup>
              {shoppingCart.map((cartItem) => {
                return (
                  <ListGroup.Item
                    key={cartItem.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{cartItem.name}</span>
                    <span>
                      {cartItem.price}
                      <FontAwesomeIcon
                        icon={faCoins}
                        style={{ marginLeft: "8px" }}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{
                          cursor: "pointer",
                          marginLeft: "32px",
                        }}
                        onClick={(): void => {
                          removeCartItem(cartItem.id);
                        }}
                      />
                    </span>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "8px",
                padding: "0.75rem 1.25rem",
              }}
            >
              {cartTotal}
              <FontAwesomeIcon icon={faCoins} style={{ marginLeft: "8px" }} />
              <h6
                style={{
                  marginLeft: "10px",
                  marginBottom: "0px",
                }}
              >
                Total
              </h6>
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    shoppingCart: state.cartState.products,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCartItem: (itemId: string) => dispatch(removeProductFromCart(itemId)),
});

export const Checkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutComponent);
