import React from "react";
import "./App.css";
import PiePlot from "./components/PiePlot";
import Main from "./components/Main";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/pieprot" component={PiePlot} exact />
        <Route path="/" component={Main} exact />
      </Switch>
    </Router>
  );
};

export default App;
