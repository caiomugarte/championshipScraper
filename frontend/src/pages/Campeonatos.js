import * as React from "react";

import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Box from "@mui/joy/Box";
const axios = require("axios");
var campeonatos = [];

function preencheCampeonatos(campeonato) {
  if (campeonato.local === "South America") {
    campeonatos.push(campeonato);
  }
  console.log(campeonato);
}

export default function Campeonatos() {
  const [campeonatosLiquipedia, setcampeonatosLiquipedia] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("/liquipedia");
      setcampeonatosLiquipedia(response.data);

      console.log(response.data);
    }
    getData();
  }, []);
  campeonatosLiquipedia.forEach(preencheCampeonatos);
  return (
    <div>
      <Typography level="h1">Campeonatos</Typography>
      <List>
        {campeonatos.map((campeonato) => (
          <ListItem>
            <Box>
              <Typography>Título: {campeonato.titulo}</Typography>
              <Typography>Local: {campeonato.local}</Typography>
              <Typography>Liquipedia</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
