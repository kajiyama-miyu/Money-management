import React from "react";
import CalendarBoard from "../components/CalendarBoard";
import Navigation from "../components/Navigation";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import HeaderMenu from "../components/Navigation/header";

dayjs.locale("ja");

export type Props = {
  index: number;
  value: number;
};

const TabPanel: React.FC<Props> = (props) => {
  const { index, value, children } = props;
  console.log(index);
  console.log(value);
  console.log(children);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
