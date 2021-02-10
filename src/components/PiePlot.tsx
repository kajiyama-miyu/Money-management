import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { selectDataDaily, fetchDataDaily } from "../store/piePlotSlice";
import MoneyData from "../components/MoneyData";
import Month from "../components/Month";
import dayjs from "dayjs";
import { fetchMoneyData } from "../store/moneyDataSlice";
import TotalAmount from "../components/TotalAmount";
import { fetchInitialState, fetchTotalIncome } from "../store/totalAmountSlice";

const PiePlot: React.FC = () => {
  const dataDaily = useSelector(selectDataDaily);
  const [amount, setAmount] = useState<Array<number>>([]);
  const [userNum, setUserNum] = useState("abcde");
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);

  const onClickPreviousMonth = () => {
    const day = dayjs(`${year}-${month}`).add(-1, "month");
    setYear(day.year());
    setMonth(day.month() + 1);
    setArg({ userNum: userNum, year: day.year(), month: day.month() + 1 });
  };

  const onClickNextMonth = () => {
    const day = dayjs(`${year}-${month}`).add(1, "month");
    console.log(day);
    setYear(day.year());
    setMonth(day.month() + 1);
    setArg({ userNum: userNum, year: day.year(), month: day.month() + 1 });
  };

  const dispatch = useDispatch();
  const [arg, setArg] = useState<{
    userNum: string;
    year: number;
    month: number;
  }>({ userNum: userNum, year: year, month: month });

  useEffect(() => {
    dispatch(fetchDataDaily(arg));
    dispatch(fetchMoneyData(arg));
    dispatch(fetchInitialState(arg));
    dispatch(fetchTotalIncome(arg));
  }, [dispatch, arg]);

  //PieChart
  const createPiePlotData = (amount: Array<number>) => {
    let data = {
      labels: ["Windows", "Mac", "Linux"],
      datasets: [
        {
          data: amount,
          backgroundColor: ["#4169e1", "#ff1493", "#FFCE56"],
          hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
          borderColor: ["transparent", "transparent", "transparent"],
        },
      ],
    };
    return data;
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: { display: true },
  };
  const [piePlotData, setPiePlotData] = useState(createPiePlotData(amount));

  useEffect(() => {
    setAmount(dataDaily);
  }, [dataDaily]);

  useEffect(() => {
    setPiePlotData(createPiePlotData(amount));
  }, [amount]);

  return (
    <div>
      <div className="inc-exp-container">
        <Month
          onClickNextMonth={onClickNextMonth}
          onClickPreviousMonth={onClickPreviousMonth}
          year={arg.year}
          month={arg.month}
        />
        <Pie data={piePlotData} options={options} width={300} height={300} />
        <TotalAmount />
      </div>
      <MoneyData />
    </div>
  );
};

export default PiePlot;
