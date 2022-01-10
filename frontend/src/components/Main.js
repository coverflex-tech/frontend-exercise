import React from "react";
import Product from "./Product";

export default function Main(props) {
   //const { products, onAddProduct } = props;
   console.log(props)
   return (
      <main>
         <h2>Produts</h2>
         <div id="products">
            {props.products.map((product) => (
               <Product
                  key={product.id}
                  product={product}
                  onAddProduct={props.onAddProduct}
               ></Product>
            ))}
         </div>
      </main>
   );
}
