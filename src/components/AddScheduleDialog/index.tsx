import React, { useEffect, useCallback, useState, useContext } from "react";
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
import { fetchMoneyData, postIncome } from "../../redux/addSchedule/slice";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../auth/AuthProvider";
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

type Props = { newDate: dayjs.Dayjs; isOpen: boolean; doClose: () => void };

export type AddItemType = {
  userNum: string | null;
  amount?: number;
  income?: number;
  jenre: string;
  details: string;
  date: dayjs.Dayjs | null;
};

//金額入力フォーム
const AddScheduleDialog: React.FC<Props> = React.memo(
  function AddScheduleDialog(props) {
    const { newDate, isOpen, doClose } = props;
    const { uid } = useContext(AuthContext);
    const { register, handleSubmit, errors, formState } = useForm<AddItemType>({
      mode: "onChange",
    });

    const [amount, setAmount] = useState("");
    const [expenseJenre, setExpenseJenre] = useState("食費");
    const [incomeJenre, setIncomeJenre] = useState("給料");
    const [details, setDetails] = useState("");
    const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
    const [dialogStatus, setDialogStatus] = useState(true);
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
          <MenuItem value="家賃・光熱費">家賃・光熱費</MenuItem>
          <MenuItem value="趣味">趣味</MenuItem>
          <MenuItem value="美容">美容</MenuItem>
          <MenuItem value="医療費">医療費</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </Select>
      </Grid>
    );

    useEffect(() => {
      setDate(newDate);
    }, [newDate]);

    //金額をセット
    const handleAmountValue = (value: string) => {
      setAmount(value);
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
            <MenuItem value="家賃・光熱費">家賃・光熱費</MenuItem>
            <MenuItem value="趣味">趣味</MenuItem>
            <MenuItem value="美容">美容</MenuItem>
            <MenuItem value="医療費">医療費</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
          </Select>
        </Grid>
      );
    }, [expenseJenre]);

    const handleChangeIncome = useCallback(() => {
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

    const [arg, setArg] = useState<AddItemType>({
      userNum: "",
      amount: 0,
      income: 0,
      jenre: "",
      details: "",
      date: dayjs(),
    });

    const dispatch = useDispatch();

    useEffect(() => {
      if (date != null && dialogStatus === true) {
        setArg({
          userNum: uid,
          amount: Number(amount),
          jenre: expenseJenre,
          details: details,
          date: date,
        });
      } else {
        setArg({
          userNum: uid,
          income: Number(amount),
          jenre: incomeJenre,
          details: details,
          date: date,
        });
      }
    }, [uid, amount, expenseJenre, details, date, incomeJenre, dialogStatus]);

    const handleSaveData = () => {
      if (dialogStatus) {
        dispatch(fetchMoneyData(arg));
      } else {
        dispatch(postIncome(arg));
      }

      doClose();

      setAmount("");
      setExpenseJenre("食費");
      setIncomeJenre("給料");
      setDetails("");
      setDate(newDate);
      setDialogStatus(true);
    };

    const onSubmit = (data: AddItemType): void => console.log(data);

    const handleClose = () => {
      setDialogStatus(true);

      doClose();

      setAmount("");
      setExpenseJenre("食費");
      setIncomeJenre("給料");
      setDetails("");
      setDate(newDate);
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
            <MenuItem value="家賃・光熱費">家賃・光熱費</MenuItem>
            <MenuItem value="趣味">趣味</MenuItem>
            <MenuItem value="美容">美容</MenuItem>
            <MenuItem value="医療費">医療費</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
          </Select>
        </Grid>
      );
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
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
            <TextField
              autoFocus
              autoComplete="off"
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
              {select}
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
              onClick={handleSaveData}
            >
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
);

export default AddScheduleDialog;
