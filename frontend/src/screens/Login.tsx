import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { login, logout, useAuth } from "../state/UserContext";

export const Login = () => {
  const {
    dispatch,
    state: { auth, user },
  } = useAuth();
  const [userName, setUserName] = useState("");

  let history = useHistory();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login(dispatch, userName, () => history.replace("/"));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  return (
    <div>
      <h1>Login</h1>
      {auth ? (
        <>
          <p>{user?.user_id} you're already logged in</p>
          <button
            type="button"
            onClick={() => {
              logout(dispatch, () => history.push("/login"));
            }}
          >
            Logout
          </button>
          <button type="button" onClick={() => history.push("/")}>
            back to shop
          </button>
        </>
      ) : (
        <form onSubmit={onSubmit}>
          <label>
            User:
            <input type="text" value={userName} onChange={handleChange} />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};
