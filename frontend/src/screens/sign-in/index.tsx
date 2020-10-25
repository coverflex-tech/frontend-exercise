import React from "react";
import { History } from "history";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { fetchUserRequest, FetchUserInput } from "../../store";

interface SignInProps {
  history: History;
  signIn: (payload: FetchUserInput) => any;
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
      <>
        <h1>Sign In</h1>
        <Form
          onSubmit={(event: React.SyntheticEvent): void => {
            event.preventDefault();
            const { signIn } = this.props;
            const { username } = this.state;
            signIn({
              username,
              callbacks: {
                success: (): void => {
                  this.props.history.push("/products");
                },
              },
            });
          }}
        >
          <Form.Group controlId="formSignIn">
            <Form.Label>Welcome to Coverflex Benefits</Form.Label>
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
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (payload: FetchUserInput) => dispatch(fetchUserRequest(payload)),
});

export const SignIn = connect(null, mapDispatchToProps)(SignInComponent);
