import { Center, CenterProps } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode | ReactNode[];
} & CenterProps;

export const BenefitsContainer = ({ children, ...props }: ContainerProps) => {
  return (
    <Center
      flexDirection="column"
      bg={"AppWorkspace"}
      borderRadius="md"
      shadow="base"
      p={5}
      {...props}
    >
      {children}
    </Center>
  );
};
