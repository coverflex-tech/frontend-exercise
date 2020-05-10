import axios from 'axios';

export const getUser = async (username) => {
    return await axios.get(`/api/users/${username}`);
}

export const getProducts = async () => {
    return await axios.get(`/api/products`);
}

export const placeOrder = async (orderBody) => {
    return await axios.post(`/api/orders`, orderBody);
}