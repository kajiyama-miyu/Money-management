import React from "react";
import "./App.css";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./auth/Login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Router> */}
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
        {/* </Router> */}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
