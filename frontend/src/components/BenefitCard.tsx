import { Flex, Spacer, Text, WrapItem } from "@chakra-ui/layout";
import { BackgroundProps } from "@chakra-ui/styled-system";
import { Product } from "../api/products";

type BenefitCardProps = {
  selected: boolean;
  item: Product;
  selectItem?: (product: Product) => void;
  unSelectItem?: (product: Product) => void;
  backgroundColor?: BackgroundProps["bg"];
};

export const cardStyleProps = {
  p: "4",
  w: ["100%", "140px", "200px"],
  h: ["140px", "140px", "200px"],
  boxShadow: "base",
  borderRadius: "md",
};

export const BenefitCard = ({
  selected,
  item,
  selectItem,
  unSelectItem,
  backgroundColor = "AppWorkspace",
}: BenefitCardProps) => {
  const borderProps = selected
    ? {
        border: "2px",
        borderColor: "teal.500",
      }
    : {};

  const onClick = () => {
    if (selected && unSelectItem) {
      unSelectItem(item);
    }
    if (!selected && selectItem) {
      selectItem(item);
    }
  };

  const hoverProps =
    selectItem && unSelectItem
      ? {
          boxShadow: "md",
          cursor: "pointer",
        }
      : {};

  return (
    <WrapItem
      {...cardStyleProps}
      bg={backgroundColor}
      {...borderProps}
      onClick={onClick}
      _hover={hoverProps}
    >
      <Flex flexDirection="column" boxSize="100%">
        <Text>{item.name}</Text>
        <Spacer />
        <Text alignSelf="flex-end">{item.price} FP</Text>
      </Flex>
    </WrapItem>
  );
};
