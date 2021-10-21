import { Redirect, Route } from "react-router";
import { useAppState } from "../state/StateContext";

export const AuthenticatedRoute = ({ path, children }: any) => {
  const {
    state: { authenticated },
  } = useAppState();
  return (
    <Route
      path={path}
      render={({ location }) => {
        return authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
