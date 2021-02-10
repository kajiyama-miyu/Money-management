import React from "react";
import { IncomeType } from "../../redux/addSchedule/slice";

const styles: { [key: string]: React.CSSProperties } = {
  schedule: {
    width: "90%",
    backgroundColor: "#F08080",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    padding: "1px, 4px",
    margin: "1px, 0",
    cursor: "pointer",
  },
};

type Props = {
  income: IncomeType;
  onClickIncome: (
    income: IncomeType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const Income: React.FC<Props> = (props) => {
  const { income, onClickIncome } = props;

  return (
    <div style={styles.schedule} onClick={(e) => onClickIncome(income, e)}>
      {income.income}円
    </div>
  );
};

export default Income;
