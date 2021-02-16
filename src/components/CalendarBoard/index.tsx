import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  GridList,
  Typography,
  Paper,
  CssBaseline,
  Grid,
  Button,
} from "@material-ui/core";
import CalendarElement from "../CalendarElement";
import {
  createCalendar,
  getNextMonth,
  getPreviousMonth,
} from "../../services/calendar";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import calendarSlice, {
  DayState,
  selectCalendarData,
} from "../../redux/calendar/slice";
import AddScheduleDialog from "../../components/AddScheduleDialog";
import {
  selectSchedules,
  ItemType,
  fetchCurrentData,
  fetchCurrentIncome,
  selectIncome,
  IncomeType,
} from "../../redux/addSchedule/slice";
import { setSchedules } from "../../services/schedule";
import { currentScheduleSlice } from "../../redux/currentSchedule/slice";
import CurrentScheduleDialog from "../CurrentScheduleDialog/index";
import CurrentIncomeDialog from "../CurrentScheduleDialog/income";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import UpDateMoneyDialog from "../AddScheduleDialog/edit";
import {
  selectCurrentSchedule,
  selectCurrentIncome,
} from "../../redux/currentSchedule/slice";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "90vh",
  },
  grid: {
    borderLeft: "1px solid #ccc",
    borderTop: "1px solid #ccc",
  },
  days: {
    borderRight: "1px solid #ccc",
    paddingTop: "10px",
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5, 30),
    padding: theme.spacing(5, 5),
  },
  yearmonth: {
    margin: theme.spacing(2, 0, 1, 0),
  },
}));

export type CalendarType = Array<dayjs.Dayjs>;

type Week = Array<string>;

const days: Week = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoad: React.FC = React.memo(function CalendarBoad() {
  const calendarData: DayState = useSelector(selectCalendarData);
  const scheduleData = useSelector(selectSchedules);
  const incomeData = useSelector(selectIncome);
  const currentData = useSelector(selectCurrentSchedule);
  const currentIncome = useSelector(selectCurrentIncome);

  //カレンダーの表示とスケジュールの表示を同時に行う
  const callbackCalendar = useMemo(() => {
    const calendar = setSchedules(
      createCalendar(calendarData),
      scheduleData,
      incomeData
    );

    return calendar;
  }, [calendarData, scheduleData, incomeData]);

  const [changeDate, setChangeDate] = useState(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userNum, setUserNum] = useState("abc");
  const [edidDialog, setEditDialogOpen] = useState(false);

  const handleOpen = useCallback((c: dayjs.Dayjs): void => {
    setDialogOpen(true);
    setChangeDate(c);
  }, []);

  const dispatch = useDispatch();
  const classes = useStyles();

  //編集のダイアログオープン
  const handleEditOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      setEditDialogOpen(true);
      dispatch(currentScheduleSlice.actions.setCloseCurrentDialog());
    },
    [dispatch]
  );

  //支出のダイアログオープン
  const handleOpenCurrentData = useCallback(
    (schedule: ItemType, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();

      dispatch(currentScheduleSlice.actions.setOpenCurrentDialog());
      dispatch(currentScheduleSlice.actions.setCurrentSchedule(schedule));
    },
    [dispatch]
  );

  //収入のダイアログオープン
  const handleOpenCurrentIncomeData = useCallback(
    (income: IncomeType, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();

      dispatch(currentScheduleSlice.actions.setOpenCurrentIncomeDialog());
      dispatch(currentScheduleSlice.actions.setCurrentIncome(income));
    },
    [dispatch]
  );

  //支出のダイアログクローズ
  const handleCloseCurrentDialog = useCallback(() => {
    dispatch(currentScheduleSlice.actions.setCloseCurrentDialog());
  }, [dispatch]);

  //収入のダイアログククローズ
  const handleCloseCurrentIncomeDialog = useCallback(() => {
    dispatch(currentScheduleSlice.actions.setCloseCurrentIncomeDialog());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  //編集ダイアログクローズ
  const handleEditClose = useCallback(() => {
    setEditDialogOpen(false);
  }, []);

  //収入と支出のデータ取得
  useEffect(() => {
    dispatch(fetchCurrentData({ userNum: userNum }));
    dispatch(fetchCurrentIncome({ userNum: userNum }));
  }, [dispatch, userNum]);

  //翌月のカレンダーセット
  const setNextMonthData = useCallback((): void => {
    const nextMonth: DayState = getNextMonth(calendarData);
    dispatch(calendarSlice.actions.carenderSetMonth(nextMonth));
  }, [dispatch, calendarData]);

  //前月のカレンダーセット
  const setPreviousData = useCallback((): void => {
    const preMonth: DayState = getPreviousMonth(calendarData);
    dispatch(calendarSlice.actions.carenderSetMonth(preMonth));
  }, [dispatch, calendarData]);

  return (
    <div style={styles.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Grid container justify="space-between">
          <Grid item>
            <Button variant="outlined" onClick={setPreviousData}>
              <ArrowBackIos />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={setNextMonthData}>
              <ArrowForwardIos />
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h4" align="center" className={classes.yearmonth}>
          {calendarData.year}年 {calendarData.month}月
        </Typography>
        <GridList style={styles.grid} cols={7} spacing={0} cellHeight="auto">
          {days.map((d: string) => (
            <li key={d}>
              <Typography
                style={styles.days}
                color="textSecondary"
                align="center"
                variant="caption"
                component="div"
              >
                {d}
              </Typography>
            </li>
          ))}
          {callbackCalendar.map(({ date, schedules, income }) => (
            <li key={date.toISOString()} onClick={() => handleOpen(date)}>
              <CalendarElement
                day={date}
                month={calendarData}
                schedules={schedules}
                income={income}
                onClickSchedule={handleOpenCurrentData}
                onClickIncome={handleOpenCurrentIncomeData}
              />
            </li>
          ))}

          <AddScheduleDialog
            newDate={changeDate}
            isOpen={dialogOpen}
            doClose={handleClose}
          />
          <CurrentScheduleDialog
            doClose={handleCloseCurrentDialog}
            onClickOpenEdit={handleEditOpen}
          />
          <CurrentIncomeDialog doDialogClose={handleCloseCurrentIncomeDialog} />
          <UpDateMoneyDialog
            isEditOpen={edidDialog}
            doClose={handleEditClose}
            currentData={currentData}
            currentIncome={currentIncome}
            ArrayData={scheduleData}
            ArrayIncome={incomeData}
          />
        </GridList>
      </Paper>
    </div>
  );
});

export default CalendarBoad;
