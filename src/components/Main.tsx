import React from "react";
import CalendarBoard from "../components/CalendarBoard";
import Navigation from "../components/Navigation";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

const Main: React.FC = () => {
  return (
    <div>
      <Navigation />
      <CalendarBoard />
    </div>
  );
};

export default Main;
