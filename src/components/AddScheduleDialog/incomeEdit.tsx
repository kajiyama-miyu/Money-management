import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Input,
  Grid,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import {
  CategoryOutlined,
  NoteOutlined,
  AccessTime,
  Close,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/date-fns";
import {
  updateExpense,
  IncomeType,
  postIncome,
  ItemType,
} from "../../redux/addSchedule/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentSchedule,
  selectCurrentIncome,
} from "../../redux/currentSchedule/slice";
import { selectSchedules, selectIncome } from "../../redux/addSchedule/slice";

const spacer = { margin: "4px, 0" };

const styles: { [key: string]: React.CSSProperties } = {
  closeButton: {
    textAlign: "right",
  },
  expenseButton: {
    backgroundColor: "#F08080",
  },
  incomeButton: {
    backgroundColor: "rgb(121, 134, 203)",
  },
  saveButton: {
    backgroundColor: "#87CEFA",
  },
  button: {
    backgroundColor: "#FFFFFF",
    color: "#4169E1",
    border: "1px solid #4169E1",
  },
};

const Title = withStyles({
  root: { marginBottom: 32, fontSize: 22 },
})(Input);

type Props = {
  doClose: () => void;
  isEditOpen: boolean;
  currentIncomeData: IncomeType | null;
  ArrayIncomeData: Array<IncomeType>;
};

export type EditItemType = {
  moneyId: number;
  userNum: string;
  amount: number;
  jenre: string;
  details: string;
  date: dayjs.Dayjs | null;
};

export type EditIncomeType = {
  incomeId: number;
  userNum: string;
  income: number;
  jenre: string;
  details: string;
  date: dayjs.Dayjs | null;
};

//金額入力フォーム
const UpDateIncomeDialog: React.FC<Props> = React.memo((props) => {
  const { isEditOpen, doClose, currentIncomeData, ArrayIncomeData } = props;

  //編集したいデータのidと一致する物を抽出（idは唯一の値なので抽出できる値は一つだけ）
  const newData = ArrayIncomeData.filter(
    (s) => s.incomeId === currentIncomeData?.incomeId
  );

  console.log("newData", newData);

  const [amount, setAmount] = useState(0);
  const [expenseJenre, setExpenseJenre] = useState("食費");
  const [incomeJenre, setIncomeJenre] = useState("給料");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [userNum, seUserNum] = useState<string>("abc");
  const [dialogStatus, setDialogStatus] = useState(true);
  const [moneyId, setMoneyId] = useState(0);
  const [incomeId, setIncomeId] = useState(0);

  const [select, setSelect] = useState(
    <Grid item xs={10}>
      <Select
        value={expenseJenre}
        onChange={(e) => {
          handleExpenseJenreValue(e.target.value as string);
        }}
        fullWidth
        autoFocus
      >
        <MenuItem value="食費">食費</MenuItem>
        <MenuItem value="日用品">日用品</MenuItem>
        <MenuItem value="衣服">衣服</MenuItem>
        <MenuItem value="交通費">交通費</MenuItem>
        <MenuItem value="その他">その他</MenuItem>
      </Select>
    </Grid>
  );

  //編集したいデータをvalueにつめる(条件分岐で支出か収入かを分ける)
  useEffect(() => {
    console.log("setNewData");
    if (newData !== null) {
      for (let n of newData) {
        setMoneyId(n.incomeId);
        setAmount(n.income);
        setIncomeJenre(n.jenre);
        setDetails(n.details);
        setDate(dayjs(n.date));
        setDialogStatus(false);
        setSelect(
          <Grid item xs={10}>
            <Select
              value={n.jenre}
              onChange={(e) => {
                handleIncomeJenreValue(e.target.value as string);
              }}
              fullWidth
              autoFocus
            >
              <MenuItem value="給料">給料</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </Select>
          </Grid>
        );
      }
    }
  }, [currentIncomeData, ArrayIncomeData]);

  //金額をセット
  const handleAmountValue = (value: string) => {
    setAmount(Number(value));
  };
  //カテゴリーをセット
  const handleExpenseJenreValue = (value: string) => {
    setExpenseJenre(value);
  };
  const handleIncomeJenreValue = (value: string) => {
    setIncomeJenre(value);
  };
  //メモをセット
  const handleDetailsValue = (value: string) => {
    setDetails(value);
  };
  // //日付をセット
  const handleDateValue = (value: Date | null) => {
    let newDay = null;
    if (value != null) {
      newDay = dayjs(value);
    }
    setDate(newDay);
  };

  const handleChangeExpense = useCallback(() => {
    console.log("支出", expenseJenre);
    setDialogStatus(true);
    setSelect(
      <Grid item xs={10}>
        <Select
          value={expenseJenre}
          onChange={(e) => {
            handleExpenseJenreValue(e.target.value as string);
          }}
          fullWidth
          autoFocus
        >
          <MenuItem value="食費">食費</MenuItem>
          <MenuItem value="日用品">日用品</MenuItem>
          <MenuItem value="衣服">衣服</MenuItem>
          <MenuItem value="交通費">交通費</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </Select>
      </Grid>
    );
  }, [expenseJenre]);

  const handleChangeIncome = useCallback(() => {
    console.log("収入", incomeJenre);
    setDialogStatus(false);
    setSelect(
      <Grid item xs={10}>
        <Select
          value={incomeJenre}
          onChange={(e) => {
            handleIncomeJenreValue(e.target.value as string);
          }}
          fullWidth
          autoFocus
        >
          <MenuItem value="給料">給料</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </Select>
      </Grid>
    );
  }, [incomeJenre]);

  //valueをまとめて送るためのオブジェクト
  const [arg, setArg] = useState<EditItemType>({
    moneyId: 0,
    userNum: "",
    amount: 0,
    jenre: "",
    details: "",
    date: dayjs(),
  });

  //valueをまとめて送るためのオブジェクト
  const [argIncome, setArgIncome] = useState<EditIncomeType>({
    incomeId: 0,
    userNum: "",
    income: 0,
    jenre: "",
    details: "",
    date: dayjs(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (date != null && dialogStatus === true) {
      console.log("expense arg");

      setArg({
        moneyId: moneyId,
        userNum: userNum,
        amount: amount,
        jenre: expenseJenre,
        details: details,
        date: date,
      });
    } else {
      setArgIncome({
        incomeId: incomeId,
        userNum: userNum,
        income: amount,
        jenre: incomeJenre,
        details: details,
        date: date,
      });
    }
  }, [userNum, amount, expenseJenre, details, date, incomeJenre, dialogStatus]);

  //保存したら元のデータをつめる
  const handleSaveData = () => {
    console.log("status", dialogStatus);
    if (dialogStatus) {
      dispatch(updateExpense(arg));
    } else {
      // dispatch(postIncome(argIncome));
    }

    doClose();

    if (newData !== null) {
      for (let n of newData) {
        setAmount(n.income);
        setExpenseJenre(n.jenre);
        setDetails(n.details);
        setDate(dayjs(n.date));
        setDialogStatus(true);
        setSelect(
          <Grid item xs={10}>
            <Select
              value={n.jenre}
              onChange={(e) => {
                handleIncomeJenreValue(e.target.value as string);
              }}
              fullWidth
              autoFocus
            >
              <MenuItem value="給料">給料</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </Select>
          </Grid>
        );
      }
    }
  };

  //クローズしたら現在のダイアログの値を再度セットする
  const handleClose = useCallback(() => {
    doClose();

    if (newData !== null) {
      for (let n of newData) {
        setAmount(n.income);
        setIncomeJenre(n.jenre);
        setDetails(n.details);
        setDate(dayjs(n.date));
        setDialogStatus(false);
        setSelect(
          <Grid item xs={10}>
            <Select
              value={n.jenre}
              onChange={(e) => {
                handleExpenseJenreValue(e.target.value as string);
              }}
              fullWidth
              autoFocus
            >
              <MenuItem value="食費">食費</MenuItem>
              <MenuItem value="日用品">日用品</MenuItem>
              <MenuItem value="衣服">衣服</MenuItem>
              <MenuItem value="交通費">交通費</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </Select>
          </Grid>
        );
      }
    }
  }, [doClose, expenseJenre, incomeJenre, newData]);

  return (
    <Dialog open={isEditOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogActions>
        <div style={styles.closeButton}>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </div>
      </DialogActions>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Button
            variant="outlined"
            style={dialogStatus ? styles.expenseButton : styles.button}
            onClick={() => handleChangeExpense()}
          >
            支出
          </Button>
          <Button
            variant="outlined"
            style={dialogStatus ? styles.button : styles.incomeButton}
            onClick={() => handleChangeIncome()}
          >
            収入
          </Button>
        </Grid>
      </Grid>
      <DialogContent>
        <Title
          autoFocus
          fullWidth
          placeholder="金額"
          value={amount}
          onChange={(e) => {
            handleAmountValue(e.target.value);
          }}
        />
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <CategoryOutlined />
          </Grid>
          {select}
        </Grid>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <NoteOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextField
              style={spacer}
              fullWidth
              placeholder="メモ"
              value={details}
              onChange={(e) => {
                handleDetailsValue(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <AccessTime />
          </Grid>
          <Grid item xs={10}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={date}
                onChange={(d) => handleDateValue(d)}
                variant="inline"
                format="yyyy年M月d日"
                animateYearScrolling
                disableToolbar
                fullWidth
                style={spacer}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          style={styles.saveButton}
          variant="outlined"
          onClick={() => handleSaveData()}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default UpDateIncomeDialog;
