import {
  Box,
  Center,
  Flex,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createOrder, getProducts, Product } from "../api/products";
import { Header } from "../components/Header";
import { login, logout, useAuth } from "../state/UserContext";

export const Benefits = () => {
  const {
    dispatch,
    state: { user },
  } = useAuth();
  const userId = user!.user_id;
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);
  const headerlogOut = () => logout(dispatch, () => history.push("/login"));
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  const filteredProducts = products.filter(
    (product) => !user!.data.product_ids.includes(product.id)
  );

  const sumPriceSelectedItems = selectedItems.reduce((prev, current) => {
    return current.price + prev;
  }, 0);

  useEffect(() => {
    login(dispatch, userId);
    getProducts()
      .then((products) => setProducts(products.products))
      .catch((e) => console.log(e));
  }, [userId, dispatch]);
  const [orderError, setOrderError] = useState();

  const purchase = () => {
    createOrder({
      order: {
        items: selectedItems.map((item) => item.id),
        user_id: user!.user_id,
      },
    })
      .then((resp) => {
        // resp.order.data.items
        // resp.order.data.total
        dispatch({
          type: "order_completed",
          payload: {
            items: resp.order.data.items,
            value: resp.order.data.total,
          },
        });
      })
      .catch((e) => {
        if (e.error) setOrderError(e);
      });
  };

  return (
    <Flex h="100%" justifyContent="center">
      <Box
        p="4"
        width={["100%", "80%"]}
        maxW="62em"
        flexDirection="column"
        alignItems="center"
      >
        <Header logout={headerlogOut} user={user} />
        <Center
          flexDirection="column"
          bg={"AppWorkspace"}
          borderRadius="md"
          p={5}
        >
          <Wrap spacing={3} justify="center">
            {filteredProducts.map((item, i) => {
              const { id, name, price } = item;
              const borderProps = selectedItems.includes(item)
                ? {
                    border: "2px",
                    borderColor: "green.400",
                  }
                : {};
              return (
                <WrapItem
                  p="4"
                  w={["100%", "140px", "200px"]}
                  h={["140px", "140px", "200px"]}
                  boxShadow="base"
                  borderRadius="md"
                  key={id}
                  {...borderProps}
                  onClick={() => {
                    if (selectedItems.includes(item)) {
                      setSelectedItems(
                        selectedItems.filter(
                          (selected) => item.id !== selected.id
                        )
                      );
                    } else {
                      setSelectedItems([...selectedItems, item]);
                    }
                  }}
                  _hover={{
                    boxShadow: "md",
                    cursor: "pointer",
                  }}
                >
                  <Flex flexDirection="column" boxSize="100%">
                    <Text unselectable="on">{name}</Text>
                    <Spacer />
                    <Text alignSelf="flex-end">{price} FP</Text>
                  </Flex>
                </WrapItem>
              );
            })}
          </Wrap>
          <Text mt={2}>Selected Value {sumPriceSelectedItems}FP</Text>
          <Text>balance: {user?.data.balance}FP</Text>
          <Text>
            Remaining balance after purchase:
            {(user?.data.balance ?? 0) - sumPriceSelectedItems}FP
          </Text>
          <Button onClick={purchase}>Purchase selected items</Button>
          <Text>{JSON.stringify(orderError)}</Text>
        </Center>
      </Box>
    </Flex>
  );
};
