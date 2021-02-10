import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "../rootReducer";
import { formatMonth } from "../../services/calendar";

export type DayState = {
  year: number;
  month: number;
};

const day = dayjs();

export const init: DayState = formatMonth(day);

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: init,
  reducers: {
    carenderSetMonth: (state, action: PayloadAction<DayState>) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
    },
  },
});

export const selectCalendarData = (state: RootState) => state.calendar;

export default calendarSlice;
