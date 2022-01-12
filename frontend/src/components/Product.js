export default function Product(props) {

   const { product, onAddProduct } = props;
   
   return (
      <div className="product-container">
        <div className="img-container">
         <div className="img-simulation"></div>
        </div>
         <h3>{product.name}</h3>
         <h4>{product.price} flexpoints</h4>
         <div className="btn-container">
            <button className="primary-btn" onClick={() => onAddProduct(product)}>Add to basket</button>
         </div>
      </div>
   );
}
