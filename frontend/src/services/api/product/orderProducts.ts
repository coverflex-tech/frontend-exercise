import requestHandler from 'utils/requestHandler';

interface RequestParams {
    products: string[];
    userId: string;
}

const orderProducts = ({ userId, products }: RequestParams) =>
  requestHandler.post<void>(
    `/api/orders`,
    {
        order: {
            user_id: userId,
            items: products
        }
    },
  );

export default orderProducts;
