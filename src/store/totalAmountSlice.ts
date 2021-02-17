import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";

type TOTAL_EXPENSES = number;
type TOTAL_INCOME = number;

type amountState = {
  totalExpenses: TOTAL_EXPENSES;
  totalIncome: TOTAL_INCOME;
};

//stateの初期値
const initialState: amountState = {
  totalExpenses: 0,
  totalIncome: 0,
};

//支出の合計を取得
export const fetchInitialState = createAsyncThunk(
  "covid/getExpenses",
  async (arg: { userNum: string; month: number; year: number }) => {
    const { userNum, month, year } = arg;

    const { data } = await axios.get<number>(
      "http://localhost:8080/getTotalExpense",
      {
        params: {
          userNum,
          month,
          year,
        },
      }
    );
    return { data: data };
  }
);

//収入の合計を取得
export const fetchTotalIncome = createAsyncThunk(
  "covid/getIncome",
  async (arg: { userNum: string; month: number; year: number }) => {
    const { userNum, month, year } = arg;
    const { data } = await axios.get<number>(
      "http://localhost:8080/getTotalIncome",
      {
        params: {
          userNum,
          month,
          year,
        },
      }
    );
    return { data: data };
  }
);

const totalAmountSlice = createSlice({
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
    builder.addCase(fetchInitialState.fulfilled, (state, action) => {
      // スプレッド構文
      return {
        ...state, // クローン
        totalExpenses: action.payload.data, // 上書き
      };
    });
    builder.addCase(fetchTotalIncome.fulfilled, (state, action) => {
      return {
        ...state,
        totalIncome: action.payload.data,
      };
    });
  },
});

export const selectTotalExpenses = (state: RootState) =>
  state.totalAmount.totalExpenses;
export const selectTotalIncome = (state: RootState) =>
  state.totalAmount.totalIncome;

export default totalAmountSlice.reducer;
