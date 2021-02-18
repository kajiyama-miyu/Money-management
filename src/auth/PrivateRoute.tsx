import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Login from "../auth/Login";
import { Route } from "react-router-dom";

type Props = {
  component: React.FC;
  exact: boolean;
  path: string;
};
const PrivateRoute: React.FC<Props> = ({
  component: RouteCmponent,
  ...options
}) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteCmponent : Login;

  console.log("currentUser", currentUser);
  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
