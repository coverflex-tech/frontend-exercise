import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./screens/Login";
import { Shop } from "./screens/Shop";

import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { useSessionState } from "./state/useSessionState";
import { contextWrapper } from "./state/contextWrapper";

function App() {
  useSessionState();
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <AuthenticatedRoute path="/">
          <Shop />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
}

export default contextWrapper(App);
