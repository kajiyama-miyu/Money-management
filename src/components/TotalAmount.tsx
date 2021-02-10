import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectTotalExpenses,
  selectTotalIncome,
} from "../store/totalAmountSlice";
const TotalAmount: React.FC = () => {
  const totalExpense = useSelector(selectTotalExpenses);
  const totalIncome = useSelector(selectTotalIncome);
  //storeから受け取る支出合計
  const [expense, setExpense] = useState(0);
  //storeから受け取る収入合計
  const [income, setIncome] = useState(0);

  useEffect(() => {
    setExpense(totalExpense);
    setIncome(totalIncome);
  }, [totalExpense, totalIncome]);

  return (
    <div className="inc-exp-container">
      <div className="inc-container">
        <h2>支出</h2>
        <div className="right">
          {expense}
          <span>円</span>
        </div>
      </div>
      <div className="exp-container">
        <h2>収入</h2>
        <div className="right">
          {income}
          <span>円</span>
        </div>
      </div>
    </div>
  );
};

export default TotalAmount;
