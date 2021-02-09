import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "../redux/calendar/slice";
import scheduleSlice from "../redux/addSchedule/slice";
import currentScheduleSlice from "../redux/currentSchedule/slice";

//Storeの定義。reduceをまとめる機能もある
export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    schedule: scheduleSlice.reducer,
    current: currentScheduleSlice.reducer,
  },
});

//複数のreducerをまとめた場合に、最終定期なStateの型を取り出す
export type RootState = ReturnType<typeof store.getState>;
