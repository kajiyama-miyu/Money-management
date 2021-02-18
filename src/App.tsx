import React, { useState, useCallback } from "react";
import "./App.css";
import PiePlot from "./components/PiePlot";
import TabPanel from "./components/Main";
import HeaderMenu from "./components/Navigation/header";
import CalendarBoad from "./components/CalendarBoard";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoneyData from "./components/MoneyData/MoneyData";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./auth/Login";
import { Route, Switch, Router, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <div>
      <HeaderMenu onChengeTab={handleChangeComponent} value={value} />
      <TabPanel value={value} index={0}>
        <CalendarBoad />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PiePlot />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MoneyData />
      </TabPanel>
    </div>
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
