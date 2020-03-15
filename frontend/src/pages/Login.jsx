import React, { useState } from "react";
import { Button, Input, Form, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api/users";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const loginUser = () => {
    setIsLoading(true);
    getUser(username).then(user => {
      setUser(user);
      history.push("/products-list");
    });
  };

  return (
    <div style={{ paddingTop: "10%" }}>
      <Header as="h1" textAlign="center">
        Login
      </Header>
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
          <Button type="submit">Log in</Button>
        </Form>
      </section>
    </div>
  );
};

export default Login;
