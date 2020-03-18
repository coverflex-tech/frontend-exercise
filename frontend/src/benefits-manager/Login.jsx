import React, { useState } from "react";
import { Button, Input, Form, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ROUTES from "./routes";

const Login = ({ userLoading, getUser }) => {
  const [username, setUsername] = useState("");

  const history = useHistory();
  const goToBenefitsList = () => history.push(ROUTES.BENEFITS_LIST);

  return (
    <React.Fragment>
      <div className="App-login">
        <Header as="h1" textAlign="center">
          Login
        </Header>
        <Form
          onSubmit={() => {
            getUser(username).then(goToBenefitsList);
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
