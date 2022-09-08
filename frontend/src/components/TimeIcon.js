import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import drz from "../images/time/drz.jpg";

export default function Home() {
  return (
    <Box
      sx={{
        width: 250,
        overflow: "auto",
        p: 10,
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      }}
    >
      <AspectRatio
        sx={{
          borderRadius: "100px",
          border: 3,
          borderColor: "grey",
          overflow: "hidden",
          width: 200,
        }}
        minHeight={200}
        maxHeight={1000}
      >
        <img src={drz} alt="" />
      </AspectRatio>
    </Box>
  );
}
