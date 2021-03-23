import React, { useState, useCallback } from "react";
import PiePlot from "./PiePlot";
import TabPanel from "./Main";
import HeaderMenu from "./Navigation/header";
import CalendarBoad from "./CalendarBoard";
import MoneyData from "./MoneyData/MoneyData";

const Home: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChangeComponent = useCallback(
    (e: React.ChangeEvent<{}>, value: number) => {
      setValue(value);
    },
    []
  );
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
  );
};

export default Home;
