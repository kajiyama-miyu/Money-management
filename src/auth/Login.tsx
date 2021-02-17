import React from "react";
import { Button, Card, CardActions } from "@material-ui/core";

const Login: React.FC = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      height: "90vh",
    },
    grid: {
      borderLeft: "1px solid #ccc",
      borderTop: "1px solid #ccc",
    },
    days: {
      borderRight: "1px solid #ccc",
      paddingTop: "10px",
    },
  };

  return (
    <Card>
      <CardActions>
        <Button></Button>
      </CardActions>
    </Card>
  );
};
