import React from "react";
import { connect } from "react-redux";

class ProductCalatogComponent extends React.Component {
  render() {
    return <h1>ProductCalatog</h1>;
  }
}

/*const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = { }*/

export const ProductCalatog = connect()(ProductCalatogComponent);
