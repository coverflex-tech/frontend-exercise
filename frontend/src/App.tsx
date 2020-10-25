import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

import { ProductCalatog, SignIn, Checkout } from "./screens";
import { Topbar } from "./components";
import { StoreState, isAuthenticated } from "./store";

const RoutesConfig = [
  {
    path: "/products",
    component: ProductCalatog,
    withAuth: true,
  },
  {
    path: "/sign-in",
    component: SignIn,
    withAuth: false,
  },
  {
    path: "/checkout",
    component: Checkout,
    withAuth: true,
  },
];

interface AppProps {
  isAuthenticated: boolean;
}

class AppComponent extends React.Component<AppProps, {}> {
  render() {
    const { isAuthenticated } = this.props;
    const defaultPage = isAuthenticated ? "/products" : "/sign-in";
    return (
      <div className="App">
        <Router>
          <Topbar />
          <Container fluid style={{ marginTop: "62px" }}>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Route exact path="/">
                  <Redirect
                    to={{
                      pathname: defaultPage,
                    }}
                  />
                </Route>
                {RoutesConfig.map((route) => {
                  if (route.withAuth === true && isAuthenticated === false) {
                    return (
                      <Redirect
                        key={route.path}
                        to={{
                          pathname: "/sign-in",
                        }}
                      />
                    );
                  }

                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      component={route.component}
                    ></Route>
                  );
                })}
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(AppComponent);
