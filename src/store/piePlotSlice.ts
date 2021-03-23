import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/index";

// APIから取得するdataをtypeとして定義
type DATA_DAILY = Array<number>;

// state
type covidState = {
  dataDaily: DATA_DAILY;
};

// stateの初期値
const initialState: covidState = {
  dataDaily: [],
};

interface pieResponse {
  pieDataList: Array<number>;
}

// createAsyncThunk: 非同期に対応したAction Creator
export const fetchDataDaily = createAsyncThunk(
  "covid/getPieChart",
  async (arg: { userNum: string | null; month: number; year: number }) => {
    const { userNum, month, year } = arg;
    // GenericsでAPIから取得するデータ型を保証
    const { data } = await axios.get<pieResponse>(
      "http://localhost:8080/piechart",
      {
        params: {
          userNum,
          month,
          year,
        },
      }
    );
    return { data: data.pieDataList };
  }
);

const covidSlice = createSlice({
  // Sliceの名称
  name: "covid",

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
    builder.addCase(fetchDataDaily.fulfilled, (state, action) => {
      // スプレッド構文
      return {
        ...state, // クローン
        dataDaily: action.payload.data, // 上書き
      };
    });
  },
});

// React Componentからstateを参照するための関数を定義
// React Componentでこの関数をimport後、useSelectorを用いて各値を参照することができる
export const selectDataDaily = (state: RootState) => state.covid.dataDaily;

export default covidSlice.reducer;
