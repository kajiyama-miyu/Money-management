import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IncomeType, ItemType } from "../addSchedule/slice";
import { RootState } from "../rootReducer";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

export type CurrentSchduleType = {
  item: ItemType | null;
  income: IncomeType | null;
  isDialogOpen: boolean;
  isIncomeDialogOpen: boolean;
};

export const init: CurrentSchduleType = {
  item: null,
  income: null,
  isDialogOpen: false,
  isIncomeDialogOpen: false,
};

export const currentScheduleSlice = createSlice({
  name: "current",
  initialState: init,
  reducers: {
    setCurrentSchedule: (state, action: PayloadAction<ItemType>) => {
      state.item = action.payload;
    },
    setCurrentIncome: (state, actions: PayloadAction<IncomeType>) => {
      state.income = actions.payload;
    },
    setOpenCurrentDialog: (state) => {
      state.isDialogOpen = true;
    },
    setCloseCurrentDialog: (state) => {
      state.isDialogOpen = false;
    },
    setOpenCurrentIncomeDialog: (state) => {
      state.isIncomeDialogOpen = true;
    },
    setCloseCurrentIncomeDialog: (state) => {
      state.isIncomeDialogOpen = false;
    },
  },
});

export const selectCurrentSchedule = (state: RootState) => state.current.item;
export const selectCurrentIncome = (state: RootState) => state.current.income;
export const selectCurrentDialogStatus = (state: RootState) =>
  state.current.isDialogOpen;
export const selectCurrentIncomeDialogStatus = (state: RootState) =>
  state.current.isIncomeDialogOpen;

export default currentScheduleSlice;
