import React from "react";
import { useState, useRef } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

const axios = require("axios");

export default function Desempenho() {
  const [fetchedPartidas, setFetchedPartidas] = useState("");
  React.useEffect(() => {
    getData(1);
  });

  async function getData(valorInput) {
    console.log(valorInput);
    console.log("entrei aqui no getdata");
    const response = await axios.get(`/meme?pagina=${valorInput}`);
    setFetchedPartidas(response.data.partidas);
  }

  var partidas = fetchedPartidas;
  console.log(partidas);

  const handleSelect = (select) => {
    getData(select);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          alignItems: "center",
          gap: -1,
        }}
      >
        <Select
          onChange={handleSelect}
          sx={{ justifyContent: "flex-end" }}
          defaultValue={1}
        >
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
        </Select>
      </Box>
      <Box></Box>
    </div>
  );
}
