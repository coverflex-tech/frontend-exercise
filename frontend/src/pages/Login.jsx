import React, { useState } from "react";
import { Button, Input, Form, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Login = ({ userLoading, getUser }) => {
  const [username, setUsername] = useState("");

  const history = useHistory();

  return (
    <React.Fragment>
      <Header as="h1" textAlign="center">
        Login
      </Header>
      <div
        style={{
          display: "flex",
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          onSubmit={() => {
            getUser(username).then(() => history.push("/benefits-list"));
          }}
        >
          <Form.Field>
            <label>Username</label>
            <Input
              disabled={userLoading}
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder="Username"
            />
          </Form.Field>
          <Button disabled={!username} fluid type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Login;
