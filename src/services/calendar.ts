import dayjs, { Dayjs } from "dayjs";
import { DayState } from "../redux/calendar/slice";

type calendarType = Array<dayjs.Dayjs>;

export const createCalendar = (month: DayState): calendarType => {
  //現在の日にちの月の最初の日を取得
  const firstDay: dayjs.Dayjs = getMonth(month);
  //今月の最初の日にちのインデックス番号を取得
  const firstDayIndex: number = firstDay.day();

  return Array(35)
    .fill(0)
    .map((_, i) => {
      const diffFromFirstDay = i - firstDayIndex;
      const day = firstDay.add(diffFromFirstDay, "day");
      return day;
    });
};

////当日かどうかを判断する（当日には印をつけたいため）
export const isSameDay = (d1: Date, d2: Dayjs | null) => {
  const format: string = "YYYYMMDD";
  return dayjs(d1).format(format) === d2!.format(format);
};

//今月かどうかを判定（今月以外をグレーダウンするため）
export const isSameMonth = (m1: dayjs.Dayjs, m2: dayjs.Dayjs) => {
  const format: string = "YYYYMM";
  return m1.format(format) === m2.format(format);
};

//月の最初の日にちをフォーマットするための判定
export const isFirstDay = (day: dayjs.Dayjs) => day.date() === 1;

//年-月でdayjsインスタンスを初期化（不完全な日付でも月か年の情報があれば0値で初期化してくれる）
export const getMonth = ({ year, month }: DayState) => {
  return dayjs(`${year}-${month}`);
};

//翌月の年月を取得
export const getNextMonth = (month: DayState) => {
  const day = getMonth(month).add(1, "month");
  return formatMonth(day);
};

//一つ前のの年月を取得
export const getPreviousMonth = (month: DayState) => {
  const day = getMonth(month).add(-1, "month");
  return formatMonth(day);
};

//reduxの初期値設定でやってたことと同じ。（特定の年月を取得する関数）
export const formatMonth = (day: dayjs.Dayjs) => ({
  month: day.month() + 1,
  year: day.year(),
});
