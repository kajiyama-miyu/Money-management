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
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import {
  selectCurrentDialogStatus,
  selectCurrentSchedule,
} from "../../redux/currentSchedule/slice";

type Props = { doClose: () => void };

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

const CurrentScheduleDialog: React.FC<Props> = (props) => {
  const { doClose } = props;
  const currentData = useSelector(selectCurrentSchedule);
  const openStatus = useSelector(selectCurrentDialogStatus);

  const spacer = (top: number, bottom: number) => ({
    margin: `${top}px 0 ${bottom}px 0`,
  });

  return (
    <Dialog open={openStatus} onClose={doClose} maxWidth="xs" fullWidth>
      <DialogActions>
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
                    {currentData?.amount}
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
};

export default CurrentScheduleDialog;
