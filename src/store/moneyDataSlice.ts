import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/index";
import { ItemType } from "../redux/addSchedule/slice";
import { EditItemType } from "../components/AddScheduleDialog/edit";
import { EditIncomeType } from "../components/MoneyData/SwitchButton";

type MONEY_DATA = Array<ItemType>;
type INCOME_DATA = Array<EditItemType>;

// state
export type moneyState = {
  moneyData: MONEY_DATA;
  incomeData: INCOME_DATA;
};

// stateの初期値
const initialState: moneyState = {
  moneyData: [],
  incomeData: [],
};

interface moneyResponse {
  moneyInfoList: Array<ItemType>;
}
interface incomeResponse {
  incomeInfoList: Array<EditItemType>;
}

// createAsyncThunk: 非同期に対応したAction Creator
export const fetchMoneyData = createAsyncThunk(
  "covid/getMoneyData",
  async (arg: { userNum: string; month: number; year: number }) => {
    const { userNum, month, year } = arg;
    // GenericsでAPIから取得するデータ型を保証
    const { data } = await axios.get<moneyResponse>(
      "http://localhost:8080/getMoneyData",
      {
        params: {
          userNum,
          month,
          year,
        },
      }
    );
    return { data: data.moneyInfoList };
  }
);

//収入情報を取ってくる非同期
export const fetchIncomeData = createAsyncThunk(
  "covid/getIncomeData",
  async (arg: { userNum: string; month: number; year: number }) => {
    const { userNum, month, year } = arg;
    // GenericsでAPIから取得するデータ型を保証
    const { data } = await axios.get<incomeResponse>(
      "http://localhost:8080/getIncomeData",
      {
        params: {
          userNum,
          month,
          year,
        },
      }
    );
    return { data: data.incomeInfoList };
  }
);

//支出を編集する
export const fetchUpdateData = createAsyncThunk(
  "covid/updateMoney",
  async (arg: EditItemType) => {
    const { moneyId, userNum, amount, jenre, details, date } = arg;
    const { data } = await axios.post<ItemType>(
      "http://localhost:8080/updateMoney",
      {
        moneyId,
        userNum,
        amount,
        jenre,
        details,
        date,
      }
    );
    return { data: data };
  }
);

//収入を編集する
export const fetchUpdateIncome = createAsyncThunk(
  "covid/updateIncome",
  async (arg: EditItemType) => {
    const { incomeId, userNum, income, jenre, details, date } = arg;
    const { data } = await axios.post<EditItemType>(
      "http://localhost:8080/updateIncome",
      {
        incomeId,
        userNum,
        income,
        jenre,
        details,
        date,
      }
    );
    return { data: data };
  }
);

//支出削除
export const deleteExpenses = createAsyncThunk(
  "covid/deleteExpense",
  async (arg: { moneyId?: number | undefined }) => {
    const { moneyId } = arg;

    const { data } = await axios.get<number>(
      "http://localhost:8080/deleteExpenses",
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
export const deleteIncome = createAsyncThunk(
  "covid/deleteIncome",
  async (arg: { incomeId?: number | undefined }) => {
    const { incomeId } = arg;

    const { data } = await axios.get<number>(
      "http://localhost:8080/deleteIncomeData",
      {
        params: {
          incomeId,
        },
      }
    );
    return { data: data };
  }
);

const moneySlice = createSlice({
  // Sliceの名称
  name: "money",

  // Stateの初期状態
  initialState: initialState,

  // Stateに対して許可する更新処理を定義する場所(ただし非同期処理は書けない)
  reducers: {},

  // 必要に応じて追加のReducerを指定できる
  // 別のSliceで生成されたActionに反応したい場合や非同期処理に対して
  extraReducers: (builder) => {
    // addCase:
    // 第一引数　非同期処理の状態
    //         (pending: 非同期処理中, fulfilled: 非同期処理の成功時, rejected: 非同期処理の失敗時)
    // 第二引数  reducer
    builder.addCase(fetchMoneyData.fulfilled, (state, action) => {
      // スプレッド構文
      return {
        ...state, // クローン
        moneyData: action.payload.data, // 上書き
      };
    });
    builder.addCase(fetchIncomeData.fulfilled, (state, action) => {
      return {
        ...state,
        incomeData: action.payload.data,
      };
    });
    builder.addCase(fetchUpdateData.fulfilled, (state, action) => {
      const index = state.moneyData.findIndex(
        (i) => i.moneyId === action.payload.data.moneyId
      );
      state.moneyData[index] = action.payload.data;
    });
    builder.addCase(fetchUpdateIncome.fulfilled, (state, action) => {
      const index = state.incomeData.findIndex(
        (i) => i.incomeId === action.payload.data.incomeId
      );
      state.incomeData[index] = action.payload.data;
    });
    //支出の削除(削除した瞬間に画面からも削除するための処理)
    builder.addCase(deleteExpenses.fulfilled, (state, actions) => {
      const newDatas = state.moneyData.filter(
        (s) => s.moneyId !== actions.payload.data
      );
      return {
        ...state,
        moneyData: newDatas,
      };
    });
    //収入の削除(削除した瞬間に画面からも削除するための処理)
    builder.addCase(deleteIncome.fulfilled, (state, actions) => {
      const newDatas = state.incomeData.filter(
        (s) => s.incomeId !== actions.payload.data
      );
      return {
        ...state,
        incomeData: newDatas,
      };
    });
  },
});

// React Componentからstateを参照するための関数を定義
// React Componentでこの関数をimport後、useSelectorを用いて各値を参照することができる
export const selectMoneyData = (state: RootState) => state.money.moneyData;
export const selectIncomeData = (state: RootState) => state.money.incomeData;

export default moneySlice.reducer;
