import { ReactElement } from "react";
import { UserProvider } from "./UserContext";

export const contextWrapper = (Component: () => ReactElement) => () =>
  (
    <UserProvider>
      <Component />
    </UserProvider>
  );
