import React from "react";
import { useHistory } from "react-router-dom";
import { logout, useAuth } from "../state/UserContext";

export const Shop = () => {
  const { dispatch } = useAuth();
  const history = useHistory();
  const onClick = () => logout(dispatch, () => history.push("/"));
  return (
    <div>
      shop
      <button onClick={onClick}>Sign out</button>
    </div>
  );
};
