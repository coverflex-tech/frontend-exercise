import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withSession from '../../shared/contexts/session/withSession';
import { getProducts, placeOrder } from '../../shared/utils/api';
import Card from '../../shared/components/card';

import styles from './Browse.module.css';

const Browse = ({className, userState, userName, updateOrderedProducts}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const { data: { balance } } = userState; 

    useEffect(() => {
        const fetchData = async () => {
            try{
                const { data: { products } } = await getProducts();
                products.forEach((product) => {
                    product.selected = false
                    product.disabled = userState.data.product_ids.includes(product.id);
                });
                setProducts(products);
            } catch(e){}
        }
        fetchData();
    }, [userState.data.product_ids]);

    const selectProducts = useCallback((productId) => {
        const newProducts = [...products]
        const productIndex = newProducts.findIndex((item) => item.id === productId);
        newProducts[productIndex].selected = !newProducts[productIndex].selected;
        setProducts(newProducts);
    }, [products])

    const handleCheckoutClick = useCallback(async () => {
        const selectedProducts = products.filter((item) => item.selected);
        const selectedProductsId = selectedProducts.map((item) => item.id);

        let product;
        for(product of selectedProducts) {
            if(userState.data.product_ids.includes(product.id)) {
                setError('You\'ve already purchased one of the products');
                return;
            }
        }

        const isOverBudget = selectedProducts.reduce((acc, product) => 
            product.selected ? acc + product.price : acc, 0) > balance;
        if(isOverBudget) {
            setError('Your balance is insufficient for the products you selected');
            return;
        }

        const orderBody = {
            order: {
                items: selectedProductsId,
                'user_id': userName, 
            },
        };

        try {
            await placeOrder(orderBody);
            const newProducts = [...products]
            updateOrderedProducts(selectedProducts);
            newProducts.forEach((item) => {
                item.selected = false;
                item.disabled = userState.data.product_ids.includes(item.id);
            });
            setProducts(newProducts);
        } catch (e) {
            const errorMessage = e.response.data.error;
            if(errorMessage === 'products_not_found') {
                setError('A product you ordered does not exist');
            }
            if(errorMessage === 'products_already_purchased') {
                setError('You\'ve already purchased one of the products');
            }
            if(errorMessage === 'insufficient_balance') {
                setError('Your balance is insufficient for the products you selected');
            }
        }
    }, [products, updateOrderedProducts, userName, userState.data.product_ids, balance])

    const total = products.reduce((acc, product) => product.selected ? acc + product.price : acc, 0);

    return (
        <div className={ classNames(className, styles.container) }>
            <div className={ styles.overview }>
                <div className={ styles.orderTotal}>
                    Your total order value is: 
                    <span className={ classNames(
                        styles.value,
                        total > balance && styles.overflow) }>
                            { total }
                    </span>
                </div>
                <button
                    className={ styles.checkout }
                    disabled={ total > balance || total === 0}
                    onClick={ handleCheckoutClick }>
                    Order Products
                </button>
                <div className={ styles.error }>
                    { error }
                </div>
            </div>
            <div className={ styles.products }>
                {
                    products.map((product, index) => (
                        <Card
                            key={ `${product.name}-${index}`}
                            selected={ product.selected }
                            disabled={ product.disabled }
                            id={ product.id }
                            name={ product.name }
                            price={ product.price }
                            onClick={ selectProducts }
                            className={ styles.card } />
                    ))
                }
            </div>
        </div>
    );
}

Browse.propTypes = {
    className: PropTypes.string,
    userState: PropTypes.shape({
        user_id: PropTypes.string,
        data: PropTypes.shape({
            product_ids: PropTypes.arrayOf(PropTypes.string),
            balance: PropTypes.number,
        }),
        insertedAt: PropTypes.string,
    }),
    userName: PropTypes.string,
    updateOrderedProducts: PropTypes.func,
}

export default withSession(Browse);