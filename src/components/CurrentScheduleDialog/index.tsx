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
  Delete,
  Edit,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentDialogStatus,
  selectCurrentSchedule,
} from "../../redux/currentSchedule/slice";
import { deleteCurrentData } from "../../redux/addSchedule/slice";

type Props = {
  doClose: () => void;
  onClickOpenEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const styles: { [key: string]: React.CSSProperties } = {
  closeButton: {
    textAlign: "right",
  },
  box: {
    backgroundColor: "#F08080",
    width: "16px",
    height: "16px",
    display: "block",
    marginLeft: "6px",
    borderRadius: "4px",
  },
};

const CurrentScheduleDialog: React.FC<Props> = React.memo((props) => {
  const { doClose, onClickOpenEdit } = props;
  const currentData = useSelector(selectCurrentSchedule);
  const openStatus = useSelector(selectCurrentDialogStatus);

  const spacer = (top: number, bottom: number) => ({
    margin: `${top}px 0 ${bottom}px 0`,
  });
  const dispatch = useDispatch();

  const handleDeteleSchedule = () => {
    dispatch(deleteCurrentData(currentData!));
    doClose();
  };

  return (
    <Dialog open={openStatus} onClose={doClose} maxWidth="xs" fullWidth>
      <DialogActions>
        <IconButton
          size="small"
          onClick={(e) => {
            onClickOpenEdit(e);
          }}
        >
          <Edit />
        </IconButton>
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
                    {currentData?.amount} 円
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

export default CurrentScheduleDialog;
