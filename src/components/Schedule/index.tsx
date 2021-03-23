import React from "react";
import { ItemType } from "../../redux/addSchedule/slice";

const styles: { [key: string]: React.CSSProperties } = {
  schedule: {
    width: "100%",
    backgroundColor: "#F08080",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
    padding: "10px, 4px",
    margin: "10px, 0",
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

const Schedule: React.FC<Props> = React.memo((props) => {
  const { schedule, onClickSchedule } = props;
  return (
    <div style={styles.schedule} onClick={(e) => onClickSchedule(schedule, e)}>
      {schedule.amount}円
    </div>
  );
});

export default Schedule;
