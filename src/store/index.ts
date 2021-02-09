import { configureStore } from "@reduxjs/toolkit";
// import {useSelector as rawUseSelector, TypedUseSelectorHook} from "react-redux";
import covidReducer from "../store/piePlotSlice";
import moneyReducer from "../store/moneyDataSlice";
import calendarSlice from "../redux/calendar/slice";
import scheduleSlice from "../redux/addSchedule/slice";
import currentScheduleSlice from "../redux/currentSchedule/slice";

export const store = configureStore({
  reducer: {
    covid: covidReducer,
    money: moneyReducer,
    calendar: calendarSlice.reducer,
    schedule: scheduleSlice.reducer,
    current: currentScheduleSlice.reducer,
  },
});

// 複数のreducerをまとめた場合に、最終的なStateの型を取り出す（今回はreducerは１つだが）
export type RootState = ReturnType<typeof store.getState>;

// 型情報付きのuseSelectorをここで宣言
//export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
