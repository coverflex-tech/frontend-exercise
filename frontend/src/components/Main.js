import React, { Component } from "react";
import Product from "./Product";

class Main extends Component {
   constructor(props) {
      super(props)
      this.state = { products: [] }
   }
   
   componentDidMount() {
      this.getAllProducts()
   }

   getAllProducts() {
      fetch('http://localhost:4000/api/products')
      .then(response => response.json())
      .then(data => {
         this.setState({ products: data.products });
         console.log(this.state.products)
      })
      /*.then(products => {
         console.log(products.data)
         const produt= products.data.map(produto => {
            console.log(products.data)
         })
      })*/
   }

   render() {
      return (
         <main>
            <h2>Produts</h2>
            <div id="products">
               {this.state.products.map((product) => (
                  <Product
                     key={product.id}
                     product={product}
                     onAddProduct={this.props.onAddProduct}
                  ></Product>
               ))}
            </div>
         </main>
      )
   }
}

export default Main;
