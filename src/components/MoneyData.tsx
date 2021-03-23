import React, { useEffect, useMemo, useState } from "react";
import MaterialTable from "material-table";
import { useSelector } from "react-redux";
import { selectMoneyData } from "../store/moneyDataSlice";

type MoneyInfo = {
  amount: number | undefined;
  jenre: string;
  date: Date;
  details: string;
};

const MoneyData: React.FC = () => {
  const moneyData = useSelector(selectMoneyData);
  const dataList = useMemo(() => {
    const moneyDataList: Array<MoneyInfo> = [];
    for (var i of moneyData) {
      const data: MoneyInfo = {
        amount: i.amount,
        jenre: i.jenre,
        date: i.date,
        details: i.details,
      };
      moneyDataList.push(data);
    }
    return moneyDataList;
  }, [moneyData]);

  const [money, setMoney] = useState<Array<object>>([]);

  useEffect(() => {
    setMoney(dataList);
  }, [dataList]);

  return (
    <MaterialTable
      title={"支出一覧"}
      columns={[
        { title: "日付", field: "date" },
        { title: "ジャンル", field: "jenre" },
        { title: "価格(円)", field: "amount" },
        { title: "詳細", field: "details" },
      ]}
      data={money}
      actions={[
        {
          icon: "edit",
          tooltip: "Edit Item",
          onClick: (_, rowData) =>
            alert("Open edit page of " + (rowData as any).itemName + "."),
        },
      ]}
    />
  );
};

export default MoneyData;
