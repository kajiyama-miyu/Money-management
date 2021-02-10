import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../rootReducer";
import {
  AddIncomeType,
  AddItemType,
} from "../../components/AddScheduleDialog/index";

export type ItemType = {
  moneyId: number;
  userNum: string;
  amount: number;
  jenre: string;
  details: string;
  date: Date;
};

export type IncomeType = {
  incomeId: number;
  userNum: string;
  income: number;
  jenre: string;
  details: string;
  date: Date;
};

export type ScheduleState = {
  items: Array<ItemType>;
  incomeItems: Array<IncomeType>;
  isLoading: boolean;
};

export const init: ScheduleState = {
  items: [],
  incomeItems: [],
  isLoading: false,
};

//支出の保存
export const fetchMoneyData = createAsyncThunk(
  "schedules/createSchedule",
  async (arg: AddItemType) => {
    const { userNum, amount, jenre, details, date } = arg;
    const { data } = await axios.post<ItemType>(
      "http://localhost:8080/postExpense",
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

//収入の保存
export const postIncome = createAsyncThunk(
  "schwdules/postIncome",
  async (arg: AddIncomeType) => {
    const { userNum, income, jenre, details, date } = arg;
    const { data } = await axios.post<IncomeType>(
      "http://localhost:8080/postIncome",
      {
        userNum: userNum,
        income: income,
        jenre: jenre,
        details: details,
        date: date,
      }
    );
    return { data: data };
  }
);

//支出の取得
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

//収入の取得
export const fetchCurrentIncome = createAsyncThunk(
  "schedules/getIncome",
  async (arg: { userNum: string }) => {
    const { userNum } = arg;
    const { data } = await axios.get<Array<IncomeType>>(
      "http://localhost:8080/getIncome",
      {
        params: {
          userNum,
        },
      }
    );
    return { data: data };
  }
);

//支出削除
export const deleteCurrentData = createAsyncThunk(
  "schedules/delete",
  async (arg: { moneyId: number }) => {
    const { moneyId } = arg;
    const { data } = await axios.get<number>(
      "http://localhost:8080/deleteMoney",
      {
        params: {
          moneyId,
        },
      }
    );
    return { data: data };
  }
);

//収入削除
export const deleteCurrentIncomeData = createAsyncThunk(
  "schedules/deleteIncome",
  async (arg: { incomeId: number }) => {
    const { incomeId } = arg;
    const { data } = await axios.get<number>(
      "http://localhost:8080/deleteIncome",
      {
        params: {
          incomeId,
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
    //支出の保存（入力したらそのタイミングで画面に反映させるための処理）
    builder.addCase(fetchMoneyData.fulfilled, (state, actions) => {
      // const formatedSchedule = formatSchedule(actions.payload.data);
      return {
        ...state,
        isLoading: false,
        items: [...state.items, actions.payload.data],
      };
    });
    //収入の保存
    builder.addCase(postIncome.fulfilled, (state, actions) => {
      return {
        ...state,
        isLoading: false,
        incomeItems: [...state.incomeItems, actions.payload.data],
      };
    });
    //支出の取得保存
    builder.addCase(fetchCurrentData.fulfilled, (state, actions) => {
      return {
        ...state,
        items: actions.payload.data,
        isLoading: false,
      };
    });
    builder.addCase(fetchCurrentIncome.fulfilled, (state, actions) => {
      return {
        ...state,
        incomeItems: actions.payload.data,
        isLoading: false,
      };
    });

    //支出の削除(削除した瞬間に画面からも削除するための処理)
    builder.addCase(deleteCurrentData.fulfilled, (state, actions) => {
      const newDatas = state.items.filter(
        (s) => s.moneyId !== actions.payload.data
      );
      return {
        ...state,
        isLoading: false,
        items: newDatas,
      };
    });
    //支出の削除
    builder.addCase(deleteCurrentIncomeData.fulfilled, (state, actions) => {
      const newData = state.incomeItems.filter(
        (s) => s.incomeId !== actions.payload.data
      );
      return {
        ...state,
        isLoading: false,
        incomeItems: newData,
      };
    });
  },
});

export const selectSchedules = (state: RootState) => state.schedule.items;
export const selectIncome = (state: RootState) => state.schedule.incomeItems;

export default scheduleSlice;
