import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { fetchUserRequest } from "../../store";

interface SignInProps {
  signIn: (username: string) => any;
}

interface SingInState {
  username: string;
}

class SignInComponent extends React.Component<SignInProps, SingInState> {
  constructor(props: SignInProps) {
    super(props);

    this.state = {
      username: "",
    };
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <Form
          onSubmit={(event: React.SyntheticEvent): void => {
            event.preventDefault();
            const { signIn } = this.props;
            const { username } = this.state;
            signIn(username);
          }}
        >
          <Form.Group controlId="formSignIn">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                this.setState({
                  username: event.target.value,
                });
              }}
            />
            <Form.Text className="text-muted">
              Use this username for future sign ins
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Let's Go
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (username: string) => dispatch(fetchUserRequest(username)),
});

export const SignIn = connect(null, mapDispatchToProps)(SignInComponent);
