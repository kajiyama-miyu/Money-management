import React from "react";
import "./App.css";
import PiePlot from "./components/PiePlot";
import Main from "./components/Main";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoneyData from "./components/MoneyData/MoneyData";
const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/pieprot" component={PiePlot} exact />
        <Route path="/" component={Main} exact />
        <Route path="/moneydata" component={MoneyData} exact></Route>
      </Switch>
    </Router>
  );
};

export default App;
