import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

type InfoTextProps = {
  label: string;
  info: string;
};

export const InfoText = ({ label, info }: InfoTextProps) => {
  return (
    <Flex
      w={["100%", "80%", "60%", "40%"]}
      mt={3}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="bold">{label}</Text>
      <Text>{info}</Text>
    </Flex>
  );
};
