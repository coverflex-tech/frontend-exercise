import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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
          {user && (
            <>
              <Navbar.Text style={{ marginRight: "8px" }}>
                {`${user.username} - ${user.balance}`}
              </Navbar.Text>
              <FontAwesomeIcon icon={faCoins} style={{ marginRight: "8px" }} />
              <Link to="/checkout">
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: "-3px",
                      fontSize: "12px",
                    }}
                  >
                    0
                  </span>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: state.userState.user,
});

export const Topbar = connect(mapStateToProps)(TopbarComponent);
