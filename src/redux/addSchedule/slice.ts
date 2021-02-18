import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../rootReducer";
import { AddItemType } from "../../components/AddScheduleDialog/index";
import { EditItemType } from "../../components/AddScheduleDialog/edit";

export type ItemType = {
  moneyId?: number | undefined;
  incomeId?: number | undefined;
  userNum: string;
  amount?: number;
  income?: number;
  jenre: string;
  details: string;
  date: Date;
};

export type ScheduleState = {
  items: Array<ItemType>;
  incomeItems: Array<ItemType>;
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
  async (arg: AddItemType) => {
    const { userNum, income, jenre, details, date } = arg;
    const { data } = await axios.post<ItemType>(
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
  async (arg: { userNum: string | null }) => {
    const { userNum } = arg;

    const { data } = await axios.get<Array<ItemType>>(
      "http://localhost:8080/getMoney",
      {
        params: {
          userNum,
        },
      }
    );
    console.log("data", data);
    return { data: data };
  }
);

//収入の取得
export const fetchCurrentIncome = createAsyncThunk(
  "schedules/getIncome",
  async (arg: { userNum: string | null }) => {
    const { userNum } = arg;
    const { data } = await axios.get<Array<ItemType>>(
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

//支出の更新
export const updateExpense = createAsyncThunk(
  "schedule/updateExpense",
  async (arg: EditItemType) => {
    const { moneyId, userNum, amount, jenre, details, date } = arg;
    const { data } = await axios.put<ItemType>(
      "http://localhost:8080/putExpense",
      {
        moneyId: moneyId,
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

//収入の更新
export const updateIncome = createAsyncThunk(
  "schedule/updateIncome",
  async (arg: EditItemType) => {
    const { incomeId, userNum, income, jenre, details, date } = arg;

    const { data } = await axios.put<ItemType>(
      "http://localhost:8080/putIncome",
      {
        incomeId: incomeId,
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

//支出削除
export const deleteCurrentData = createAsyncThunk(
  "schedules/delete",
  async (arg: { moneyId?: number | undefined }) => {
    const { moneyId } = arg;
    console.log("delete", moneyId);
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
  async (arg: { incomeId?: number | undefined }) => {
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

    //収入の取得保存
    builder.addCase(fetchCurrentIncome.fulfilled, (state, actions) => {
      return {
        ...state,
        incomeItems: actions.payload.data,
        isLoading: false,
      };
    });

    //支出の更新
    builder.addCase(updateExpense.fulfilled, (state, actions) => {
      const index = state.items.findIndex(
        (item) => item.moneyId === actions.payload.data.moneyId
      );
      state.items[index] = actions.payload.data;
    });

    //収入の更新
    builder.addCase(updateIncome.fulfilled, (state, actions) => {
      const index = state.incomeItems.findIndex(
        (item) => item.incomeId === actions.payload.data.incomeId
      );
      state.incomeItems[index] = actions.payload.data;
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
