import React from "react";
import { ItemType } from "../../redux/addSchedule/slice";

const styles: { [key: string]: React.CSSProperties } = {
  schedule: {
    width: "100%",
    backgroundColor: "rgb(121, 134, 203)",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    padding: "5px, 4px",
    margin: "5px, 0",
    cursor: "pointer",
  },
};

type Props = {
  income: ItemType;
  onClickIncome: (
    income: ItemType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const Income: React.FC<Props> = React.memo((props) => {
  const { income, onClickIncome } = props;

  return (
    <div style={styles.schedule} onClick={(e) => onClickIncome(income, e)}>
      {income.income}円
    </div>
  );
});

export default Income;
