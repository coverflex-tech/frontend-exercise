import React, { useState } from "react";
import { Button, Input, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api/users";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const loginUser = () => {
    setIsLoading(true);
    getUser(username).then(user => {
      history.push("/products-list", { user: user });
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <section>
        <Form onSubmit={loginUser}>
          <Form.Field>
            <label>Username</label>
            <Input
              disabled={isLoading}
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder="Username"
            />
          </Form.Field>
          <Button loginUser type="submit">
            Log in
          </Button>
        </Form>
      </section>
    </div>
  );
};

export default Login;
