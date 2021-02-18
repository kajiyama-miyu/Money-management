import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { selectDataDaily, fetchDataDaily } from "../store/piePlotSlice";
import Month from "../components/Month";
import dayjs from "dayjs";
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
    dispatch(fetchInitialState(arg));
    dispatch(fetchTotalIncome(arg));
  }, [dispatch, arg]);

  //PieChart
  const createPiePlotData = (amount: Array<number>) => {
    let data = {
      labels: [
        "食費",
        "日用品",
        "衣服",
        "交通費",
        "家賃・光熱費",
        "趣味",
        "美容",
        "医療費",
        "その他",
      ],
      datasets: [
        {
          data: amount,
          backgroundColor: [
            "#FFB6C1",
            "#4169E1",
            "#FFCE56",
            "#008B8B",
            "#9ACD32",
            "#F4A460",
            "#DA70D6",
            "#00BFFF",
            "#A9A9A9",
          ],
          hoverBackgroundColor: [
            "#FFB6C1",
            "#4169E1",
            "#FFCE56",
            "#008B8B",
            "#9ACD32",
            "#F4A460",
            "#DA70D6",
            "#00BFFF",
            "#A9A9A9",
          ],
          borderColor: [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
          ],
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
    </div>
  );
};

export default PiePlot;
