import { ChangeEvent, FormEvent, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { login, useAuth } from "../state/UserContext";

export const Login = () => {
  const {
    dispatch,
    state: { auth },
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
        <Redirect to="/" />
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
