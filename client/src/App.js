import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/containers/Home";
import Room from "./components/containers/Room";
import { AuthConsumer } from "./components/auth/AuthProvider";

function App() {
  return (
    <AuthConsumer>
      {(context) => (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/room/:roomID"
              component={() => <Room user={context.user} />}
            />
          </Switch>
        </BrowserRouter>
      )}
    </AuthConsumer>
  );
}

export default App;
