import { Text, TextProps } from "@chakra-ui/layout";
import React from "react";

type ErrorTextProps = {
  errorMessage: string;
  visible: boolean;
} & TextProps;

export default function ErrorText({
  errorMessage,
  visible,
  ...props
}: ErrorTextProps) {
  if (!visible) return null;
  return (
    <Text color="red.500" {...props}>
      {errorMessage}
    </Text>
  );
}
