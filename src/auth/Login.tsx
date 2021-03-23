import React, { useContext } from "react";
import { Button, Card, CardActions, CardHeader, Grid } from "@material-ui/core";
import { AuthContext } from "./AuthProvider";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "400",
    marginTop: "50px",
  },
  header: {
    textAlign: "center",
    background: "#212121",
    color: "#fff",
  },
  card: {
    marginTop: "10px",
  },
  loginBtn: {
    backgroundColor: "#87CEFA",
  },
};
const Login: React.FC = () => {
  const { login } = useContext(AuthContext);

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    login();
  };

  return (
    <form style={styles.container}>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Card style={styles.card}>
            <CardHeader style={styles.header} title="ログイン" />
            <CardActions>
              <Button
                variant="contained"
                size="large"
                style={styles.loginBtn}
                onClick={(e) => handleSubmit(e)}
              >
                Googleアカウントでログイン
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
