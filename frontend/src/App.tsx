import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./screens/Login";
import { Benefits } from "./screens/Benefits";

import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { useSessionState } from "./state/useSessionState";
import { contextWrapper } from "./state/contextWrapper";
import { Box } from "@chakra-ui/layout";

function App() {
  useSessionState();
  return (
    <Box bg={"Background"} minH="100%" w="100%">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <AuthenticatedRoute path="/">
            <Benefits />
          </AuthenticatedRoute>
        </Switch>
      </Router>
    </Box>
  );
}

export default contextWrapper(App);
