import { useState } from "react";
import productsAvailable from "../data/productsData";
import Basket from "./Basket";
import Main from "./Main";

export default function Home(props) {
    const products = productsAvailable;
    console.log(products)
    //const users = users
    // users
    const [cartItems, setCartItems] = useState(props.cartItems); // Inicial state

    const onAddProduct = (product) => {
        const hasProduct = cartItems.find((x) => x.id === product.id);
        if (hasProduct) {
            //alert("users aren't allowed to order a product previously ordered")
        } else {
            setCartItems([...cartItems, product]); // add new product to basket
        }
    };

    const onRemoveProduct = (product) => {
        const hasProduct = cartItems.find((x) => x.id === product.id);
        if (hasProduct) {
            setCartItems(cartItems.filter((x) => x.id !== product.id)); // remove product from basket
            //} else {
        }
    };

    console.log("Home, ", products)

    return (
        <div id="main-container">
            <Main
                onAddProduct={onAddProduct}
                products={products}
                className="col-1"
            ></Main>
            <Basket
                onAddProduct={onAddProduct}
                onRemoveProduct={onRemoveProduct}
                cartItems={cartItems}
                className=""
            ></Basket>
        </div>
    )
}





