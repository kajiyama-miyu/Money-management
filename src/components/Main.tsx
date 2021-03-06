import React from "react";

import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

export type Props = {
  index: number;
  value: number;
};

const TabPanel: React.FC<Props> = React.memo(function TablePanel(props) {
  const { index, value, children } = props;
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
});

export default TabPanel;
