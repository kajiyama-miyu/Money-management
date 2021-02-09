import React from "react";
import { IconButton, Toolbar, Typography, withStyles } from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { getNextMonth, getPreviousMonth } from "../../services/calendar";
import { useDispatch, useSelector } from "react-redux";
import { calendarSlice, selectCalendarData } from "../../redux/calendar/slice";
import { DayState } from "../../redux/calendar/slice";

const StyledToolbar = withStyles({
  root: { padding: "0" },
})(Toolbar);

const StyledTypography = withStyles({
  root: { margin: "0 30px 0 10px" },
})(Typography);

const Navigation: React.FC = () => {
  const data: DayState = useSelector(selectCalendarData);
  const dispatch = useDispatch();

  const setNextMonthData = (): void => {
    const nexMonth: DayState = getNextMonth(data);
    dispatch(calendarSlice.actions.carenderSetMonth(nexMonth));
  };

  const setPreviousMonthData = (): void => {
    const preMonth: DayState = getPreviousMonth(data);
    dispatch(calendarSlice.actions.carenderSetMonth(preMonth));
  };

  return (
    <StyledToolbar>
      <IconButton>
        <DehazeIcon />
      </IconButton>
      <img
        src="/images/money.png"
        alt="カレンダーアイコン"
        width="40"
        height="40"
      />
      <StyledTypography color="textPrimary" variant="h5">
        Money Management
      </StyledTypography>
      <IconButton size="small" onClick={setPreviousMonthData}>
        <ArrowBackIos />
      </IconButton>
      <IconButton size="small" onClick={setNextMonthData}>
        <ArrowForwardIos />
      </IconButton>
    </StyledToolbar>
  );
};

export default Navigation;
