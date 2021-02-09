import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../rootReducer";
import { AddItemType } from "../../components/AddScheduleDialog/index";

export type ItemType = {
  moneyId: number;
  userNum: string;
  amount: number;
  jenre: string;
  details: string;
  date: Date;
};

export type ScheduleState = {
  items: Array<ItemType>;
  isLoading: boolean;
};

export const init: ScheduleState = {
  items: [],
  isLoading: false,
};

export const fetchMoneyData = createAsyncThunk(
  "schedules/createSchedule",
  async (arg: AddItemType) => {
    const { userNum, amount, jenre, details, date } = arg;
    const { data } = await axios.post<ItemType>(
      "http://localhost:8080/setMoney",
      {
        userNum: userNum,
        amount: amount,
        jenre: jenre,
        details: details,
        date: date,
      }
    );
    return { data: data };
  }
);
export const fetchCurrentData = createAsyncThunk(
  "schedules/getSchedule",
  async (arg: { userNum: string }) => {
    const { userNum } = arg;

    const { data } = await axios.get<Array<ItemType>>(
      "http://localhost:8080/getMoney",
      {
        params: {
          userNum,
        },
      }
    );
    return { data: data };
  }
);

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: init,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMoneyData.fulfilled, (state, actions) => {
      // const formatedSchedule = formatSchedule(actions.payload.data);
      return {
        ...state,
        isLoading: false,
        items: [...state.items, actions.payload.data],
      };
    });
    builder.addCase(fetchCurrentData.fulfilled, (state, actions) => {
      return {
        ...state,
        items: actions.payload.data,
        isLoading: false,
      };
    });
  },
});

export const selectSchedules = (state: RootState) => state.schedule.items;

export default scheduleSlice;
