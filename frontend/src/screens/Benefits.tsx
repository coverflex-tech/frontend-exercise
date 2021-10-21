import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text, Wrap } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProducts, Product } from "../api/products";
import { BenefitCard } from "../components/BenefitCard";
import { BenefitCardsSkeleton } from "../components/BenefitCardsSkeleton";
import { BenefitsContainer } from "../components/BenefitsContainer";
import ErrorText from "../components/ErrorText";
import { Header } from "../components/Header";
import { InfoText } from "../components/InfoText";
import { purchase } from "../state/orderActions";
import { useAppState } from "../state/StateContext";
import { getUser, logout } from "../state/userActions";

type productStatus = "loading" | "error" | "resolved";

export const Benefits = () => {
  const {
    dispatch,
    state: { user, orderError, loadingOrder },
  } = useAppState();
  const userId = user!.user_id;
  const history = useHistory();
  const [loadingProducts, setLoadingProducts] =
    useState<productStatus>("loading");
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
  const expectedBalance = user!.data.balance - sumPriceSelectedItems;

  const purchaseDisabled =
    loadingOrder || expectedBalance < 0 || selectedItems.length === 0;

  useEffect(() => {
    dispatch({ type: "order_idle" });
    getProducts()
      .then(({ products }) => {
        setProducts(products);
        setLoadingProducts("resolved");

        // to avoid out of date order items and balance from session
        getUser(dispatch, userId);
      })
      .catch((e) => setLoadingProducts("error"));
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
        <BenefitsContainer>
          <Heading as="h3" size="lg" mb="2">
            Choose a selection of benefits
          </Heading>
          <Wrap spacing={3} justify="center" w="100%">
            <BenefitCardsSkeleton loading={loadingProducts === "loading"} />
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
          {filteredProducts.length === 0 && loadingProducts === "resolved" && (
            <Text> You've claimed everything!</Text>
          )}

          <ErrorText
            errorMessage="Something went wrong, try again"
            visible={loadingProducts === "error"}
          />
          {filteredProducts.length !== 0 && (
            <>
              <InfoText
                label="Selected Value"
                info={`${sumPriceSelectedItems}FP`}
              />
              <InfoText
                label="Balance after purchase"
                info={`${expectedBalance}FP`}
              />
              <Button
                mt="2"
                colorScheme="teal"
                onClick={makePurchase}
                isLoading={loadingOrder}
                disabled={purchaseDisabled}
              >
                Claim selected
              </Button>
            </>
          )}
          <ErrorText errorMessage={orderError ?? ""} visible={!!orderError} />
        </BenefitsContainer>
        <BenefitsContainer mt="6">
          <Heading as="h3" size="lg" mb="2">
            Benefits you've already claimed
          </Heading>
          <Wrap spacing={3} justify="center" w="100%">
            <BenefitCardsSkeleton loading={loadingProducts === "loading"} />
            {claimedItems.map((item) => (
              <BenefitCard
                key={item.id}
                item={item}
                selected={false}
                backgroundColor="gray.200"
              />
            ))}
          </Wrap>
          <ErrorText
            errorMessage="Something went wrong, try again"
            visible={loadingProducts === "error"}
          />
          {claimedItems.length === 0 && loadingProducts === "resolved" && (
            <Text>No benefits claimed yet</Text>
          )}
        </BenefitsContainer>
      </Box>
    </Flex>
  );
};
