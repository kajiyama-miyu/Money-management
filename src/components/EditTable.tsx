import React, { useContext, useEffect, useState } from "react";
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
import { deleteExpenses, fetchUpdateData } from "../store/moneyDataSlice";
import { EditItemType } from "../components/AddScheduleDialog/edit";
import { AuthContext } from "../auth/AuthProvider";
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
  moneyInfo: EditItemType;
};

const EditTable: React.FC<Props> = (props) => {
  const { isOpen, doClose, moneyInfo } = props;
  const [moneyId, setMoneyId] = useState(moneyInfo.moneyId);
  const [amount, setAmount] = useState(moneyInfo.amount);
  const [jenre, setJenre] = useState(moneyInfo.jenre);
  const [details, setDetails] = useState(moneyInfo.details);
  const [date, setDate] = useState<dayjs.Dayjs | null>(moneyInfo.date);

  const { uid } = useContext(AuthContext);

  useEffect(() => {
    setMoneyId(moneyInfo.moneyId);
    setAmount(moneyInfo.amount);
    setJenre(moneyInfo.jenre);
    setDetails(moneyInfo.details);
    setDate(moneyInfo.date);
  }, [
    moneyInfo.amount,
    moneyInfo.jenre,
    moneyInfo.details,
    moneyInfo.date,
    moneyInfo.moneyId,
  ]);

  //金額をセット
  const handleAmountValue = (value: string) => {
    setAmount(Number(value));
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

  const [arg, setArg] = useState<EditItemType>({
    moneyId: 0,
    userNum: "",
    amount: 0,
    jenre: "",
    details: "",
    date: dayjs(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (date != null) {
      setArg({
        moneyId: moneyId,
        userNum: uid,
        amount: amount,
        jenre: jenre,
        details: details,
        date: date,
      });
    }
  }, [moneyId, uid, amount, jenre, details, date]);

  const handleSaveData = () => {
    setArg({
      moneyId: moneyId,
      userNum: uid,
      amount: amount,
      jenre: jenre,
      details: details,
      date: date!,
    });
    dispatch(fetchUpdateData(arg));

    doClose();
  };

  //削除の処理
  const handleDeteleSchedule = () => {
    dispatch(deleteExpenses(arg));
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
              <MenuItem value="家賃・光熱費">家賃・光熱費</MenuItem>
              <MenuItem value="趣味">趣味</MenuItem>
              <MenuItem value="美容">美容</MenuItem>
              <MenuItem value="医療費">医療費</MenuItem>
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
          onClick={() => handleSaveData()}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTable;
