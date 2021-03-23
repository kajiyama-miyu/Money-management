import { Typography } from "@material-ui/core";
import React from "react";
import dayjs from "dayjs";
import {
  isSameMonth,
  isFirstDay,
  isSameDay,
  getMonth,
} from "../../services/calendar";
import { DayState } from "../../redux/calendar/slice";
import { ItemType } from "../../redux/addSchedule/slice";
import Schedule from "../Schedule/index";
import Income from "../Schedule/income";

const styles: { [key: string]: React.CSSProperties } = {
  element: {
    borderRight: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    height: "16vh",
  },
  date: {
    padding: "5px 0 30px 0px",
    height: "24px",
  },
  today: {
    display: "inline-block",
    lineHeight: "24px",
    width: "24px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    borderRadius: "50%",
  },
  notoday: {},
  schedules: {
    overflow: "scroll",
    height: "calc(18vh - 40px)",
  },
};

type Props = {
  day: dayjs.Dayjs;
  month: DayState;
  schedules: Array<ItemType>;
  income: Array<ItemType>;
  onClickSchedule: (
    schedule: ItemType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onClickIncome: (
    income: ItemType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const CalendarElement: React.FC<Props> = React.memo((props) => {
  const {
    day,
    month,
    schedules,
    onClickSchedule,
    income,
    onClickIncome,
  } = props;

  const currentMonth: dayjs.Dayjs = getMonth(month);

  //わかりやすいように今月以外はグレーダウンするための判定
  const isCurrentMonth: boolean = isSameMonth(day, currentMonth);

  //月の最初だけフォーマットを変える
  const format: string = isFirstDay(day) ? "M月 D日" : "D";

  //当日の日付を取得
  const today: dayjs.Dayjs = dayjs();
  //当日はわかりやすく style を付けたいための判定
  const isToday: boolean = isSameDay(day.toDate(), today);

  return (
    <div style={styles.element}>
      <Typography
        style={styles.date}
        align="center"
        variant="caption"
        component="div"
        color={isCurrentMonth ? "textPrimary" : "textSecondary"}
      >
        <span style={isToday ? styles.today : styles.notoday}>
          {day.format(format)}
        </span>
      </Typography>
      {/* 追加した家計簿の数だけ表示する*/}
      <div style={styles.schedules}>
        {schedules.map((e) => (
          <Schedule
            key={e.moneyId}
            schedule={e}
            onClickSchedule={onClickSchedule}
          />
        ))}
        {income.map((e) => (
          <Income key={e.incomeId} income={e} onClickIncome={onClickIncome} />
        ))}
      </div>
    </div>
  );
});

export default CalendarElement;
