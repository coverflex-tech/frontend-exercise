import { Redirect, Route } from "react-router";
import { useAuth } from "../state/UserContext";

export const AuthenticatedRoute = ({ path, children }: any) => {
  const {
    state: { auth },
  } = useAuth();
  return (
    <Route
      path={path}
      render={({ location }) => {
        return auth ? (
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
