import React, { useState, useEffect } from "react";
import { GridList, Typography } from "@material-ui/core";
import CalendarElement from "../CalendarElement";
import { createCalendar } from "../../services/calendar";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { DayState, selectCalendarData } from "../../redux/calendar/slice";
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
import {
  selectCurrentDialogStatus,
  currentScheduleSlice,
  selectCurrentIncomeDialogStatus,
} from "../../redux/currentSchedule/slice";
import CurrentScheduleDialog from "../CurrentScheduleDialog/index";
import CurrentIncomeDialog from "../CurrentScheduleDialog/income";

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

export type CalendarType = Array<dayjs.Dayjs>;

type Week = Array<string>;

const days: Week = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoad: React.FC = () => {
  const calendarData: DayState = useSelector(selectCalendarData);
  const scheduleData = useSelector(selectSchedules);
  const incomeData = useSelector(selectIncome);

  //カレンダーの表示とスケジュールの表示を同時に行う
  const calendar = setSchedules(
    createCalendar(calendarData),
    scheduleData,
    incomeData
  );

  const [changeDate, setChangeDate] = useState(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userNum, setUserNum] = useState("abc");

  const handleOpen = (c: dayjs.Dayjs): void => {
    setDialogOpen(true);
    setChangeDate(c);
  };

  const dispatch = useDispatch();

  const handleOpenCurrentData = (
    schedule: ItemType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    dispatch(currentScheduleSlice.actions.setOpenCurrentDialog());
    dispatch(currentScheduleSlice.actions.setCurrentSchedule(schedule));
  };

  const handleOpenCurrentIncomeData = (
    income: IncomeType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    dispatch(currentScheduleSlice.actions.setOpenCurrentIncomeDialog());
    dispatch(currentScheduleSlice.actions.setCurrentIncome(income));
  };

  const handleCloseCurrentDialog = () => {
    dispatch(currentScheduleSlice.actions.setCloseCurrentDialog());
  };

  const handleCloseCurrentIncomeDialog = () => {
    dispatch(currentScheduleSlice.actions.setCloseCurrentIncomeDialog());
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCurrentData({ userNum: userNum }));
    dispatch(fetchCurrentIncome({ userNum: userNum }));
  }, [dispatch, userNum]);

  return (
    <div style={styles.container}>
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
        {calendar.map(({ date, schedules, income }) => (
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
          doClose={() => handleClose()}
        />
        <CurrentScheduleDialog doClose={handleCloseCurrentDialog} />
        <CurrentIncomeDialog doDialogClose={handleCloseCurrentIncomeDialog} />
      </GridList>
    </div>
  );
};

export default CalendarBoad;
