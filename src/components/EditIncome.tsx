import React, { useEffect, useState } from "react";
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
  Delete,
  Close,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch } from "react-redux";

import { deleteIncome, fetchUpdateIncome } from "../store/moneyDataSlice";

import { AuthContext } from "../auth/AuthProvider";
import { EditIncomeType } from "./MoneyData/SwitchButton";
import { useForm } from "react-hook-form";

const spacer = { margin: "4px, 0" };

const styles: { [key: string]: React.CSSProperties } = {
  closeButton: {
    textAlign: "right",
  },
};

const Title = withStyles({
  root: { marginBottom: 32, fontSize: 22 },
})(Input);

type Props = {
  newDate: dayjs.Dayjs | null;
  isOpen: boolean;
  doClose: () => void;
  incomeInfo: EditIncomeType;
};

const EditIncome: React.FC<Props> = (props) => {
  const { isOpen, doClose, incomeInfo } = props;

  const [incomeId, setIncomeId] = useState(incomeInfo.incomeId);
  const [income, setIncome] = useState(incomeInfo.income!.toString());
  const [jenre, setJenre] = useState(incomeInfo.jenre);
  const [details, setDetails] = useState(incomeInfo.details);
  const [date, setDate] = useState<dayjs.Dayjs | null>(incomeInfo.date);

  const [userNum, seUserNum] = useState<string | null>("");

  const { uid } = useContext(AuthContext);
  const { register, handleSubmit, errors, formState } = useForm<EditIncomeType>(
    {
      mode: "onChange",
    }
  );


  useEffect(() => {
    setIncomeId(incomeInfo.incomeId);
    setIncome(incomeInfo.income!.toString());
    setJenre(incomeInfo.jenre);
    setDetails(incomeInfo.details);
    setDate(incomeInfo.date);
  }, [
    incomeInfo.incomeId,
    incomeInfo.income,
    incomeInfo.jenre,
    incomeInfo.details,
    incomeInfo.date,
  ]);

  //金額をセット
  const handleAmountValue = (value: string) => {

    setIncome(value);

  };
  //カテゴリーをセット
  const handleJenreValue = (value: string) => {
    setJenre(value);
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

  const [arg, setArg] = useState<EditIncomeType>({
    incomeId: 0,
    userNum: "",
    income: 0,
    jenre: "",
    details: "",
    date: dayjs(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (date != null) {
      setArg({
        incomeId: incomeId,
        userNum: userNum,
        income: Number(income),
        jenre: jenre,
        details: details,
        date: date,
      });
    }
  }, [incomeId, userNum, income, jenre, details, date]);

  const handleSaveData = () => {
    setArg({
      incomeId: incomeId,
      userNum: userNum,
      income: Number(income),
      jenre: jenre,
      details: details,
      date: date!,
    });
    console.log("arg", arg);
    dispatch(fetchUpdateIncome(arg));

    doClose();
  };

  //削除の処理
  const handleDeteleSchedule = () => {
    console.log("incomeId", arg.incomeId);
    dispatch(deleteIncome(arg));
    doClose();
  };

  return (
    <Dialog open={isOpen} onClose={doClose} maxWidth="xs" fullWidth>
      <DialogActions>
        <IconButton onClick={handleDeteleSchedule} size="small">
          <Delete />
        </IconButton>
        <div style={styles.closeButton}>
          <IconButton onClick={doClose} size="small">
            <Close />
          </IconButton>
        </div>
      </DialogActions>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="金額"
          value={income}
          name="income"
          inputRef={register({ required: true, pattern: /^[0-9]+$/ })}
          error={Boolean(errors.income)}
          helperText={errors.income && "数字を入力してください"}
          onChange={(e) => {
            handleAmountValue(e.target.value);
          }}
        />
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <CategoryOutlined />
          </Grid>
          <Grid item xs={10}>
            <Select
              value={jenre}
              onChange={(e) => {
                handleJenreValue(e.target.value as string);
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
          color="primary"
          variant="outlined"
          disabled={!formState.isValid}
          onClick={() => handleSaveData()}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditIncome;
