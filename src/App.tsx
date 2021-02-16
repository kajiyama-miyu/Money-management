import React, { useState, useCallback } from "react";
import "./App.css";
import PiePlot from "./components/PiePlot";
import TabPanel from "./components/Main";
import HeaderMenu from "./components/Navigation/header";
import CalendarBoad from "./components/CalendarBoard";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoneyData from "./components/MoneyData/MoneyData";
import SwitchButton from "./components/MoneyData/SwitchButton";

const App: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChangeComponent = useCallback(
    (e: React.ChangeEvent<{}>, value: number) => {
      setValue(value);
    },
    []
  );

  return (
    // <Router>
    //   <Switch>
    //     <Route path="/pieprot" component={PiePlot} exact />
    //     <Route path="/" component={Main} exact />
    //     <Route path="/moneydata" component={MoneyData} exact></Route>
    //   </Switch>
    // </Router>
    <div>
      <HeaderMenu onChengeTab={handleChangeComponent} value={value} />
      <TabPanel value={value} index={0}>
        <CalendarBoad />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PiePlot />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SwitchButton />
      </TabPanel>
    </div>
  );
};

export default App;
