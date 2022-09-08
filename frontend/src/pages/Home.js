import * as React from "react";
import TimeIcon from "../components/TimeIcon";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
export default function Home() {
  return (
    <>
      <TimeIcon />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-50px",
        }}
      >
        <Typography level="display1">Bem vindo, Dancing Ratz</Typography>
      </Box>
    </>
  );
}
