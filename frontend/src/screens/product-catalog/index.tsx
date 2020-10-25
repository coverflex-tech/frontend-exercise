import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import {
  fetchProductsRequest,
  StoreState,
  Product,
  addProductToCart,
} from "../../store";

interface ProductCalatogProps {
  products: Product[];
  getProducts: () => void;
  addToCart: (product: Product) => void;
}

class ProductCalatogComponent extends React.Component<ProductCalatogProps, {}> {
  componentDidMount(): void {
    this.props.getProducts();
  }

  render() {
    const { products, addToCart } = this.props;

    return (
      <>
        <h1 style={{ marginBottom: "32px" }}>Benefits Calatog</h1>
        {products.length === 0 && <h6>No benefits available.</h6>}

        <Container fluid>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product.id} md={{ span: 6 }}>
                  <Card
                    style={{
                      width: "100%",
                      position: "relative",
                      padding: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Subtitle
                        className="mb-2 text-muted"
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          left: "8px",
                        }}
                      >
                        Price: {product.price}
                        <FontAwesomeIcon
                          icon={faCoins}
                          style={{ marginLeft: "8px" }}
                        />
                      </Card.Subtitle>
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          cursor: "pointer",
                        }}
                        onClick={(): void => {
                          addToCart(product);
                        }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    products: state.productState.products,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProducts: () => dispatch(fetchProductsRequest()),
  addToCart: (product: Product) => dispatch(addProductToCart(product)),
});

export const ProductCalatog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCalatogComponent);
