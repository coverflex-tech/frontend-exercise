import { useMemo, Suspense, useState } from "react";
import UserCard from "../components/UserCard";
import { useAppContext } from "../context/AppContext";
import DefaultMasterpage from "../masterpages/DefaultMasterpage";
import HomeStyle from "./HomeStyle";
import useSWR from 'swr'
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { ProductArray } from "../interfaces";
import ConfirmOrderPopup from "../components/ConfirmOrderPopup";

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const fetcher = async () => await api.getProducts()

function isSubscribed(userSubscriptions: Array<string>, productId: string) {
    if (userSubscriptions && productId) {
        return userSubscriptions.includes(productId);
    } else { return false; }
}




export default function Home() {


    const [toastSeverity, setToastSeverity] = useState('success')
    const [toastVisible, setToastVisible] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const [pageBusy, setPageBusy] = useState(false)
    const [confirmOrderVisible, setConfirmOrderVisible] = useState(false)
    const { theme, user, updateUserData, shoppingCart, setShoppingCart } = useAppContext()
    const { Layout, Products, Right, ProductList } = useMemo(() => HomeStyle(theme), [theme])

    const { data } = useSWR('PRODUCTS', fetcher, { suspense: true })

    async function handleSubscription(productId: string) {

        if (!shoppingCart) {
            setShoppingCart([productId])
        }
        else if (!shoppingCart.includes(productId)) {
            setShoppingCart([...shoppingCart, productId])
        } else {
            setShoppingCart(shoppingCart.filter((x: string) => x !== productId))
        }

    }

    async function placeOrder(productIds: Array<string>) {
        setPageBusy(true)
        try {
            await api.postOrder({
                order: {
                    items: productIds,
                    user_id: user.user.user_id
                },

            })

            const u = await api.getUser(user.user.user_id)
            updateUserData(u)
            setConfirmOrderVisible(false)
            setShoppingCart([])

            setToastMessage('Order placed successfully!')
            setToastVisible(true)
            setToastSeverity('success')
        } catch (err: any) {
            setToastMessage(err.message)
            setToastVisible(true)
            setToastSeverity('error')
        } finally {
            setPageBusy(false)
        }
    }

    return (
        <DefaultMasterpage title="Benefits" loading={pageBusy}>
            <Layout>
                <Products>

                    <Suspense fallback={<h3>loading...</h3>}>
                        {data &&
                            <>
                                <h2>Products</h2>
                                <ProductList>
                                    {data.products.map((item: any, index: number) => (
                                        <ProductCard key={index} product={item}
                                            isSubscribed={isSubscribed(user.user.data.product_ids, item.id)}
                                            onClick={() => {
                                                if (!isSubscribed(user.user.data.product_ids, item.id)) {
                                                    handleSubscription(item.id)
                                                }
                                            }
                                            } />
                                    ))}
                                </ProductList>
                            </>
                        }
                    </Suspense>

                </Products>
                <Right>
                    <h2>Welcome</h2>
                    <UserCard products={data.products as ProductArray} onPlaceOrderClick={() => {
                        setConfirmOrderVisible(true)
                    }} />
                </Right>
            </Layout>

            {confirmOrderVisible &&
                <ConfirmOrderPopup
                    products={data.products as ProductArray}
                    onClose={() => setConfirmOrderVisible(false)}
                    onPlaceOrderClick={(productIds: Array<string>) => { placeOrder(productIds) }} />}

            <Snackbar open={toastVisible} onClose={() => setToastVisible(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={toastSeverity === 'success' ? 'success' : 'error'}>
                    {toastMessage}
                </Alert>
            </Snackbar>

        </DefaultMasterpage>
    );
}
