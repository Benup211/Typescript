import { FC, ReactElement } from "react";
import { Grid } from "@mui/material";

export const TaskArea: FC = (): ReactElement => {
  return (
    <Grid item md={8} sx={{
      height: "100vh",
      width: "100%",
  }}>
      <h1>Items</h1>
    </Grid>
  );
};
