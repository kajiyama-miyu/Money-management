import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIncomeData, selectMoneyData } from "../../store/moneyDataSlice";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MaterialTable from "material-table";
import EditTable from "../EditTable";
import dayjs from "dayjs";
import { ItemType } from "../../redux/addSchedule/slice";
import { EditItemType } from "../../components/AddScheduleDialog/edit";

const SwitchButton: React.FC = () => {
  const moneyData = useSelector(selectMoneyData);
  const incomeData = useSelector(selectIncomeData);
  const [money, setMoney] = useState<Array<object>>([]);
  const [income, setIncome] = useState<Array<object>>([]);
  const [changeDate, setChangeDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userNum, setUserNum] = useState("abc");
  const [moneyInfo, setMoneyInfo] = useState<EditItemType>({
    userNum: "abcde",
    moneyId: 0,
    amount: 0,
    jenre: "",
    date: dayjs(),
    details: "",
  });

  const dataList = useMemo(() => {
    const moneyDataList: Array<ItemType> = [];
    for (var i of moneyData) {
      const data: ItemType = {
        moneyId: i.moneyId,
        userNum: i.userNum,
        amount: i.amount,
        jenre: i.jenre,
        date: i.date,
        details: i.details,
      };
      moneyDataList.push(data);
    }
    return moneyDataList;
  }, [moneyData]);

  const incomeList = useMemo(() => {
    const incomeDataList: Array<ItemType> = [];
    for (var i of incomeData) {
      const data: ItemType = {
        moneyId: i.moneyId,
        userNum: i.userNum,
        amount: i.amount,
        jenre: i.jenre,
        date: i.date,
        details: i.details,
      };
      incomeDataList.push(data);
    }
    return incomeDataList;
  }, [incomeData]);

  useEffect(() => {
    setMoney(dataList);
    setIncome(incomeList);
  }, [dataList, incomeList]);

  //ダイアログを表示させるメソッド
  const onClickOpen = (rowData: EditItemType) => {
    setDialogOpen(true);
    setMoneyInfo(rowData);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>支出</Tab>
          <Tab>収入</Tab>
        </TabList>
        <TabPanel>
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
                onClick: (_, rowData) => {
                  onClickOpen(rowData as EditItemType);
                },
              },
            ]}
          />
        </TabPanel>
        <TabPanel>
          <MaterialTable
            title={"収入一覧"}
            columns={[
              { title: "日付", field: "date" },
              { title: "ジャンル", field: "jenre" },
              { title: "価格(円)", field: "amount" },
              { title: "詳細", field: "details" },
            ]}
            data={income}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Item",
                onClick: (_, rowData) => {
                  alert("Open edit page of " + (rowData as any).itemName + ".");
                  console.log("rowData", rowData);
                },
              },
            ]}
          />
        </TabPanel>
      </Tabs>
      <EditTable
        newDate={changeDate}
        isOpen={dialogOpen}
        doClose={() => handleClose()}
        moneyInfo={moneyInfo}
      ></EditTable>
    </div>
  );
};
export default SwitchButton;
