import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/index";

type MoneyInfo = { amount: number; jenre: string; date: Date; details: string };
// APIから取得するdataをtypeとして定義
type MONEY_DATA = Array<MoneyInfo>;

// state
export type moneyState = {
  moneyData: MONEY_DATA;
};

// stateの初期値
const initialState: moneyState = {
  moneyData: [],
};

interface moneyResponse {
  moneyInfoList: Array<MoneyInfo>;
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
  },
});

// React Componentからstateを参照するための関数を定義
// React Componentでこの関数をimport後、useSelectorを用いて各値を参照することができる
export const selectMoneyData = (state: RootState) => state.money.moneyData;

export default moneySlice.reducer;
