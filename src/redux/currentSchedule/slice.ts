import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "../addSchedule/slice";
import { RootState } from "../rootReducer";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

export type CurrentSchduleType = {
  item: ItemType | null;
  isDialogOpen: boolean;
};

export const init: CurrentSchduleType = {
  item: null,
  isDialogOpen: false,
};

export const currentScheduleSlice = createSlice({
  name: "current",
  initialState: init,
  reducers: {
    setCurrentSchedule: (state, action: PayloadAction<ItemType>) => {
      console.log("Date", action.payload.date);

      state.item = action.payload;
    },
    setOpenCurrentDialog: (state) => {
      state.isDialogOpen = true;
    },
    setCloseCurrentDialog: (state) => {
      state.isDialogOpen = false;
    },
  },
});

export const selectCurrentSchedule = (state: RootState) => state.current.item;
export const selectCurrentDialogStatus = (state: RootState) =>
  state.current.isDialogOpen;

export default currentScheduleSlice;
