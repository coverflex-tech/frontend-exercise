import { ReactElement } from "react";
import { UserProvider } from "./UserContext";
import { ChakraProvider } from "@chakra-ui/react";

export const contextWrapper = (Component: () => ReactElement) => () =>
  (
    <ChakraProvider>
      <UserProvider>
        <Component />
      </UserProvider>
    </ChakraProvider>
  );
