import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { StoreState, User } from "../../store";

interface TopbarProps {
  user?: User;
}

class TopbarComponent extends React.Component<TopbarProps, {}> {
  render() {
    const { user } = this.props;

    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand>
          <Link to="/">Coverflex Benefits</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/products">Catalog</Link>
          </Nav>
          <Navbar.Text>
            {user && `${user.username} - ${user.balance}`}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
});

export const Topbar = connect(mapStateToProps)(TopbarComponent);
