import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import { CalendarToday, PieChart } from "@material-ui/icons";

const StyledAppbar = withStyles({
  root: { color: "#e0f2f1", backgroundColor: "#87CEFA", position: "static" },
})(AppBar);

const StyledToolbar = withStyles({
  root: { padding: "0" },
})(Toolbar);

const StyledTypography = withStyles({
  root: { margin: "0 30px 0 10px" },
})(Typography);

export type Props = {
  onChengeTab: (e: React.ChangeEvent<{}>, value: number) => void;
  value: number;
};

const HeaderMenu: React.FC<Props> = (props) => {
  const { onChengeTab, value } = props;

  console.log("props", value);
  return (
    <StyledAppbar>
      <StyledToolbar>
        <img
          src="/images/money.png"
          alt="カレンダーアイコン"
          width="40"
          height="40"
        />
        <StyledTypography color="textPrimary" variant="h5">
          Money Management
        </StyledTypography>
        <Tabs
          value={value}
          onChange={onChengeTab}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="simple tabs example"
        >
          <Tab label="calendar" icon={<CalendarToday />} />
          <Tab label="graph" icon={<PieChart />} />
        </Tabs>
      </StyledToolbar>
    </StyledAppbar>
  );
};

export default HeaderMenu;
