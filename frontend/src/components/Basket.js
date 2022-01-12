import React from 'react';

export default function Basket(props) {

    const { cartItems, onRemoveProduct } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
    const totalBalance = 500;
    const currentBalance = totalBalance - itemsPrice;

    function postOrder() {
        let itemsIds =  getItemsIds();

        let userId = window.localStorage.getItem('myUser');
        let order = {items: itemsIds,  user_id: userId};

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({order})
        }
        fetch('http://localhost:4000/api/orders', requestOptions)
            .then(response => response.json())
            .then(() => alert('Your order was successful!'))
            .catch(() => alert('Something went wrong with your request :(')
        )
    }

    function getItemsIds() {
        let itemsIds = [];
        for (let item of cartItems) {
            itemsIds.push(item.id)
        }
        return itemsIds;
    }

    return (
        <aside id="basket">
            <div id="basket-user-balance">
                <h2>Current Balance</h2>
                <p>{currentBalance} flexpoints</p>
            </div>
            <div id="basket-items">
                <h2>Cart Items</h2>
                {cartItems.length === 0 && <p>Cart is empty</p>}
                {cartItems.map((item) => (
                    <div key={item.id} className="basket-product-container">
                        <div className="basket-product">
                            <p>
                                {item.name}
                            </p>
                            <p>{item.price} flexpoints
                                <button onClick={() => onRemoveProduct(item)} className="remove-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="small-icon" fill="none" viewBox="0 0 24 24" stroke="#f8f4f2">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </p>
                        </div>
                        <br />
                    </div>
                ))}
            </div>
            <div id="basket-total">
                {cartItems.length !== 0 && (
                    <>
                        <hr></hr>
                        <h2 className="basket-total">Total Price<span>{itemsPrice} Flexpoints</span></h2>
                        <div className="btn-container">
                            <button className="secundary-btn" onClick={() => postOrder()}>
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}