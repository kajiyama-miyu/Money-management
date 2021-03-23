import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  Tab,
  Tabs,
  Button,
} from "@material-ui/core";
import { CalendarToday, PieChart, TableChart } from "@material-ui/icons";

const StyledAppbar = withStyles({
  root: { color: "#e0f2f1", backgroundColor: "#87CEFA", position: "static" },
})(AppBar);

const StyledToolbar = withStyles({
  root: { padding: "0" },
})(Toolbar);

const StyledTypography = withStyles({
  root: { margin: "0 30px 0 10px" },
})(Typography);

const styles: { [key: string]: React.CSSProperties } = {
  logoutBtn: {
    marginLeft: "500px",
    backgroundColor: "#F08080",
  },
  name: {
    marginLeft: "300px",
    color: "#000000",
    fontSize: "10opx",
  },
};
export type Props = {
  onChengeTab: (e: React.ChangeEvent<{}>, value: number) => void;
  value: number;
};

const HeaderMenu: React.FC<Props> = React.memo(function HeaderMenu(props) {
  const { onChengeTab, value } = props;
  const { logout, currentUser } = useContext(AuthContext);

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
          <Tab label="table" icon={<TableChart />} />
        </Tabs>

        {currentUser && (
          <Button variant="outlined" style={styles.logoutBtn} onClick={logout}>
            Logout
          </Button>
        )}
      </StyledToolbar>
    </StyledAppbar>
  );
});

export default HeaderMenu;
