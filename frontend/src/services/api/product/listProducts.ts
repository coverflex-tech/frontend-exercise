import requestHandler from 'utils/requestHandler';

const listProducts = () =>
  requestHandler.get<ProductsResponse>(
    `/api/products`,
    {},
  );

export default listProducts;
