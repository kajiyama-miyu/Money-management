import React, { useState } from "react";
import "./App.css";
import PiePlot from "./components/PiePlot";
import TabPanel from "./components/Main";
import HeaderMenu from "./components/Navigation/header";
import CalendarBoad from "./components/CalendarBoard";

const App: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChangeComponent = (e: React.ChangeEvent<{}>, value: number) => {
    setValue(value);
  };

  return (
    <div>
      <HeaderMenu onChengeTab={handleChangeComponent} value={value} />
      <TabPanel value={value} index={0}>
        <CalendarBoad />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PiePlot />
      </TabPanel>
    </div>
  );
};

export default App;
