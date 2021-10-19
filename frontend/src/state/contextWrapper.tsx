import { ReactElement } from "react";
import { StateProvider } from "./StateContext";
import { ChakraProvider } from "@chakra-ui/react";

export const contextWrapper = (Component: () => ReactElement) => () =>
  (
    <ChakraProvider>
      <StateProvider>
        <Component />
      </StateProvider>
    </ChakraProvider>
  );
