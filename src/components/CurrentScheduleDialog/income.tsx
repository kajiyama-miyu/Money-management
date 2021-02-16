import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  CategoryOutlined,
  NoteOutlined,
  AccessTime,
  Close,
  DeleteOutlineOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentIncomeDialogStatus,
  selectCurrentIncome,
} from "../../redux/currentSchedule/slice";
import { deleteCurrentIncomeData } from "../../redux/addSchedule/slice";

type Props = { doDialogClose: () => void };

const styles: { [key: string]: React.CSSProperties } = {
  closeButton: {
    textAlign: "right",
  },
  box: {
    backgroundColor: "rgb(121, 134, 203)",
    width: "16px",
    height: "16px",
    display: "block",
    marginLeft: "6px",
    borderRadius: "4px",
  },
};

const CurrentIncomeDialog: React.FC<Props> = React.memo((props) => {
  const { doDialogClose } = props;
  const currentData = useSelector(selectCurrentIncome);
  const openStatus = useSelector(selectCurrentIncomeDialogStatus);

  const spacer = (top: number, bottom: number) => ({
    margin: `${top}px 0 ${bottom}px 0`,
  });
  const dispatch = useDispatch();

  const handleDeteleSchedule = () => {
    dispatch(deleteCurrentIncomeData(currentData!));
    doDialogClose();
  };

  return (
    <Dialog open={openStatus} onClose={doDialogClose} maxWidth="xs" fullWidth>
      <DialogActions>
        <IconButton onClick={handleDeteleSchedule} size="small">
          <DeleteOutlineOutlined />
        </IconButton>
        <div style={styles.closeButton}>
          <IconButton onClick={doDialogClose} size="small">
            <Close />
          </IconButton>
        </div>
      </DialogActions>

      <DialogContent>
        {currentData && (
          <>
            <div>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
                style={spacer(0, 30)}
              >
                <Grid item>
                  <span style={styles.box}></span>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" component="h2">
                    {currentData?.income} 円
                  </Typography>
                </Grid>
              </Grid>
            </div>

            {currentData.jenre && (
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
                style={spacer(0, 4)}
              >
                <Grid item>
                  <CategoryOutlined />
                </Grid>
                <Grid item xs={10}>
                  <Typography>{currentData.jenre}</Typography>
                </Grid>
              </Grid>
            )}
            {currentData.details && (
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
                style={spacer(0, 4)}
              >
                <Grid item>
                  <NoteOutlined />
                </Grid>
                <Grid item xs={10}>
                  <Typography>{currentData.details}</Typography>
                </Grid>
              </Grid>
            )}
            {currentData.date && (
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
                style={spacer(0, 4)}
              >
                <Grid item>
                  <AccessTime />
                </Grid>
                <Grid item xs={10}>
                  <Typography>{currentData.date}</Typography>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});

export default CurrentIncomeDialog;
