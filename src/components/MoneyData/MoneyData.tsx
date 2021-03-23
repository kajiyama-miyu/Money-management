import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { selectMoneyData } from "../../store/moneyDataSlice";
import { fetchIncomeData, fetchMoneyData } from "../../store/moneyDataSlice";
import dayjs from "dayjs";
import Month from "../Month";
import SwitchButton from "./SwitchButton";
import { AuthContext } from "../../auth/AuthProvider";
// type MoneyInfo = { amount: number; jenre: string; date: Date; details: string };

const MoneyData: React.FC = () => {
  // const moneyData = useSelector(selectMoneyData);

  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const { uid } = useContext(AuthContext);

  const [arg, setArg] = useState<{
    userNum: string | null;
    year: number;
    month: number;
  }>({ userNum: uid, year: year, month: month });

  const onClickPreviousMonth = () => {
    const day = dayjs(`${year}-${month}`).add(-1, "month");
    setYear(day.year());
    setMonth(day.month() + 1);
    setArg({ userNum: uid, year: day.year(), month: day.month() + 1 });
  };

  const onClickNextMonth = () => {
    const day = dayjs(`${year}-${month}`).add(1, "month");
    setYear(day.year());
    setMonth(day.month() + 1);
    setArg({ userNum: uid, year: day.year(), month: day.month() + 1 });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoneyData(arg));
    dispatch(fetchIncomeData(arg));
  }, [dispatch, arg]);

  return (
    <div>
      <div className="inc-exp-container">
        <Month
          onClickNextMonth={onClickNextMonth}
          onClickPreviousMonth={onClickPreviousMonth}
          year={arg.year}
          month={arg.month}
        />
      </div>
      <SwitchButton></SwitchButton>
    </div>
  );
};

export default MoneyData;
