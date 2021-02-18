import React, { useEffect, useState, useCallback, useContext } from "react";
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
  Typography,
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
import { ItemType, updateIncome } from "../../redux/addSchedule/slice";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../auth/AuthProvider";
import { EditItemType } from "./edit";
import { useForm } from "react-hook-form";

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
  title: {
    marginBottom: "20px",
  },
};

const Title = withStyles({
  root: { marginBottom: 32, fontSize: 22 },
})(Input);

type Props = {
  doClose: () => void;
  isEditOpen: boolean;
  currentIncomeData: ItemType | null;
  ArrayIncomeData: Array<ItemType>;
};

//金額入力フォーム
const UpDateIncomeDialog: React.FC<Props> = React.memo((props) => {
  const { isEditOpen, doClose, currentIncomeData, ArrayIncomeData } = props;
  const { uid } = useContext(AuthContext);
  const { register, handleSubmit, errors, formState } = useForm<EditItemType>({
    mode: "onChange",
  });

  //編集したいデータのidと一致する物を抽出（idは唯一の値なので抽出できる値は一つだけ）
  const newData = ArrayIncomeData.filter(
    (s) => s.incomeId === currentIncomeData?.incomeId
  );

  const [amount, setAmount] = useState<string | undefined>("");
  const [incomeJenre, setIncomeJenre] = useState("給料");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [dialogStatus, setDialogStatus] = useState(true);
  const [incomeId, setIncomeId] = useState<number | undefined>(0);

  //編集したいデータをvalueにつめる(条件分岐で支出か収入かを分ける)
  useEffect(() => {
    if (newData !== null) {
      for (let n of newData) {
        setIncomeId(n.incomeId);
        setAmount(n.income?.toString());
        setIncomeJenre(n.jenre);
        setDetails(n.details);
        setDate(dayjs(n.date));
      }
    }
  }, [currentIncomeData, ArrayIncomeData]);

  //金額をセット
  const handleAmountValue = (value: string) => {
    setAmount(value);
  };
  //カテゴリーをセット
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

  //valueをまとめて送るためのオブジェクト
  const [argIncome, setArgIncome] = useState<EditItemType>({
    incomeId: 0,
    userNum: "",
    income: 0,
    jenre: "",
    details: "",
    date: dayjs(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setArgIncome({
      incomeId: incomeId,
      userNum: uid,
      income: Number(amount),
      jenre: incomeJenre,
      details: details,
      date: date,
    });
  }, [uid, amount, details, date, incomeJenre, dialogStatus]);

  const onSubmit = (data: EditItemType): void => console.log(data);

  //保存したら元のデータをつめる
  const handleSaveData = () => {
    dispatch(updateIncome(argIncome));

    doClose();

    if (newData !== null) {
      for (let n of newData) {
        setAmount(n.income?.toString());
        setIncomeJenre(n.jenre);
        setDetails(n.details);
        setDate(dayjs(n.date));
      }
    }
  };

  //クローズしたら現在のダイアログの値を再度セットする
  const handleClose = useCallback(() => {
    doClose();

    if (newData !== null) {
      for (let n of newData) {
        setAmount(n.income?.toString());
        setIncomeJenre(n.jenre);
        setDetails(n.details);
        setDate(dayjs(n.date));
      }
    }
  }, [doClose, incomeJenre, newData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={isEditOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogActions>
          <div style={styles.closeButton}>
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </div>
        </DialogActions>
        <Typography align="center" variant="h5">
          編集
        </Typography>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="text"
            placeholder="金額"
            value={amount}
            name="amount"
            inputRef={register({ required: true, pattern: /^[0-9]+$/ })}
            error={Boolean(errors.amount)}
            helperText={errors.amount && "数字を入力してください"}
            style={styles.title}
            onChange={(e) => {
              handleAmountValue(e.target.value);
            }}
          />
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <CategoryOutlined />
            </Grid>
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
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
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
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
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
            disabled={!formState.isValid}
            onClick={() => handleSaveData()}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
});

export default UpDateIncomeDialog;
