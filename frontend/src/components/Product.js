//import React from "react";

export default function Product(props) {
   const { product, onAddProduct } = props;
   return (
      <div className="product-container">
        <div className="img-container">
         <img className="" src={product.image} alt={product.name}></img>
        </div>
         <h3>{product.name}</h3>
         <h4>{product.price} flexpoints</h4>
         <div className="btn-container">
            <button className="primary-btn" onClick={() => onAddProduct(product)}>Add to basket</button>
         </div>
      </div>
   );
}
