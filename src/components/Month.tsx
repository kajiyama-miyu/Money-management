import React from "react";
import { IconButton, Toolbar, withStyles } from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

type Props = {
  // initialState: dayState;
  // setYearMonth: (getYearMonth: dayState) => void;
  onClickPreviousMonth: () => void;
  onClickNextMonth: () => void;
  year: number;
  month: number;
};
const Month: React.FC<Props> = (props) => {
  const StyledToolbar = withStyles({
    root: { padding: 0 },
  })(Toolbar);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledToolbar>
        <IconButton size="small" onClick={props.onClickPreviousMonth}>
          <ArrowBackIos />
        </IconButton>
        {props.year}年{props.month}月
        <IconButton size="small" onClick={props.onClickNextMonth}>
          <ArrowForwardIos />
        </IconButton>
      </StyledToolbar>
    </MuiPickersUtilsProvider>
  );
};

export default Month;
