import { isSameDay } from "./calendar";
import { CalendarType } from "../components/CalendarBoard/index";
import { ItemType } from "../redux/addSchedule/slice";
import dayjs from "dayjs";

//カレンダーの作成とカレンダーの日付と同じ日に金額を表示する処理
export const setSchedules = (
  calendar: CalendarType,
  schedules: Array<ItemType>,
  income: Array<ItemType>
) => {
  return calendar.map((c) => ({
    date: c,
    schedules: schedules.filter((e) => isSameDay(e.date, c)),
    income: income.filter((e) => isSameDay(e.date, c)),
  }));
};

export const formatSchedule = (schedule: ItemType) => ({
  ...schedule,
  date: dayjs(schedule.date),
});
