import React from "react";
import { ItemType } from "../../redux/addSchedule/slice";

const styles: { [key: string]: React.CSSProperties } = {
  schedule: {
    width: "90%",
    backgroundColor: "rgb(121, 134, 203)",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    padding: "1px, 4px",
    margin: "1px, 0",
    cursor: "pointer",
  },
};

type Props = {
  schedule: ItemType;
  onClickSchedule: (
    schedule: ItemType,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const Schedule: React.FC<Props> = (props) => {
  const { schedule, onClickSchedule } = props;
  return (
    <div style={styles.schedule} onClick={(e) => onClickSchedule(schedule, e)}>
      {schedule.amount}円
    </div>
  );
};

export default Schedule;
