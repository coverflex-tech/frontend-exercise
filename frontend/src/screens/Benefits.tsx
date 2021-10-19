import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Heading, Text, Wrap } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProducts, Product } from "../api/products";
import { BenefitCard } from "../components/BenefitCard";
import { Header } from "../components/Header";
import { purchase } from "../state/orderActions";
import { useAppState } from "../state/StateContext";
import { getUser, logout } from "../state/userActions";

export const Benefits = () => {
  const {
    dispatch,
    state: { user, orderError, loadingOrder },
  } = useAppState();
  const userId = user!.user_id;
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);
  const headerlogOut = () => logout(dispatch, () => history.push("/login"));
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const userItems = user!.data.product_ids;
  const claimedItems = products.filter((product) =>
    userItems.includes(product.id)
  );

  const filteredProducts = products.filter(
    (product) => !userItems.includes(product.id)
  );

  const sumPriceSelectedItems = selectedItems.reduce((prev, current) => {
    return current.price + prev;
  }, 0);

  useEffect(() => {
    const getData = async () => {
      // to avoid out of date order items and balance from session
      await getUser(dispatch, userId);
      await getProducts()
        .then(({ products }) => setProducts(products))
        .catch((e) => console.log(e));
    };
    getData();
  }, [dispatch, userId]);

  const makePurchase = () => {
    purchase(dispatch, selectedItems, user!);
    setSelectedItems([]);
  };

  const selectItem = (item: Product) =>
    setSelectedItems([...selectedItems, item]);

  const unSelectItem = (item: Product) =>
    setSelectedItems(
      selectedItems.filter((selected) => item.id !== selected.id)
    );

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
          shadow="base"
          p={5}
        >
          <Heading as="h3" size="lg" mb="2">
            Choose a selection of benefits
          </Heading>
          <Wrap spacing={3} justify="center">
            {filteredProducts.length === 0 && (
              <Text> You've claimed everything!</Text>
            )}
            {filteredProducts.map((item) => (
              <BenefitCard
                key={item.id}
                item={item}
                selected={selectedItems.includes(item)}
                selectItem={selectItem}
                unSelectItem={unSelectItem}
              />
            ))}
          </Wrap>
          {selectedItems.length > 0 && (
            <>
              <Text mt={2}>Selected Value {sumPriceSelectedItems}FP</Text>
              <Text>
                Remaining balance after purchase:
                {(user?.data.balance ?? 0) - sumPriceSelectedItems}FP
              </Text>
              <Button onClick={makePurchase} isLoading={loadingOrder}>
                Purchase selected items
              </Button>
            </>
          )}
          {selectedItems.length === 0 && filteredProducts.length > 0 && (
            <Text mt={2}>Nothing selected!</Text>
          )}
          {orderError && <Text color="red.500">{orderError}</Text>}
        </Center>
        <Center
          flexDirection="column"
          bg={"AppWorkspace"}
          borderRadius="md"
          shadow="base"
          p={5}
          mt="4"
        >
          <Heading as="h3" size="lg" mb="2">
            Benefits you've already claimed
          </Heading>
          <Wrap spacing={3} justify="center">
            {claimedItems.map((item) => (
              <BenefitCard
                key={item.id}
                item={item}
                selected={false}
                backgroundColor="gray.100"
              />
            ))}
          </Wrap>
        </Center>
      </Box>
    </Flex>
  );
};
