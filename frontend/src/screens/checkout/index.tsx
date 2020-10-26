import React from "react";
import { History } from "history";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  StoreState,
  Product,
  removeProductFromCart,
  postOrderRequest,
  getUser,
  User,
  OrderInput,
} from "../../store";

interface CheckoutProps {
  history: History;
  shoppingCart: Product[];
  loading: boolean;
  user: User;
  submitOrder: (input: OrderInput) => void;
  removeCartItem: (itemId: string) => void;
}

class CheckoutComponent extends React.Component<CheckoutProps, {}> {
  render() {
    const {
      shoppingCart,
      removeCartItem,
      submitOrder,
      user,
      loading,
    } = this.props;

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
            <Button
              variant="primary"
              disabled={loading || user.balance < cartTotal}
              onClick={(): void => {
                if (
                  window.confirm(
                    `Are you sure you want to buy the benefits for ${cartTotal} points?`
                  )
                ) {
                  submitOrder({
                    items: shoppingCart,
                    callbacks: {
                      success: (): void => {
                        this.props.history.push("/products");
                      },
                    },
                  });
                }
              }}
            >
              {loading ? "Loading..." : "Buy Now"}
            </Button>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    shoppingCart: state.cartState.products,
    loading: state.cartState.loading,
    user: getUser(state) as User,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCartItem: (itemId: string) => dispatch(removeProductFromCart(itemId)),
  submitOrder: (input: OrderInput) => dispatch(postOrderRequest(input)),
});

export const Checkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutComponent);
