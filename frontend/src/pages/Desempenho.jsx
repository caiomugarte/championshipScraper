import React from "react";
import { useState, useRef } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import MirageFoto from "../images/mapa/mirage.jpg";
import InfernoFoto from "../images/mapa/inferno.jpg";
import OverpassFoto from "../images/mapa/overpass.jpg";
import DustFoto from "../images/mapa/dust.jpg";
import { alpha } from "@mui/material";

const axios = require("axios");
var partidas = [];
var nomeTime = "Dancing Ratz";
var mapaJogo;

const mapas = {
  de_mirage: <img src={MirageFoto} alt="" />,
  de_inferno: <img src={InfernoFoto} alt="" />,
  de_overpass: <img src={OverpassFoto} alt="" />,
  de_dust2: <img src={DustFoto} alt="" />,
};

function setPartidasTime(fetchedPartida) {
  console.log(fetchedPartida);
  fetchedPartida.forEach((partida) => {
    var timeA = partida.time_a;
    var timeB = partida.time_b;
    if (timeA == nomeTime || timeB == nomeTime) {
      console.log(partida);
      partidas.push(partida);
    }
  });
}

function setMapaImage(partida) {
  for (const mapa in mapas) {
    if (mapa == partida.jogos.map_name) {
      return mapas[mapa];
    }
  }
}

function trataResultadoCardCor(partida) {
  var timeA = partida.time_a;
  var timeB = partida.time_b;
  var scoreA = partida.jogos.score_a;
  var scoreB = partida.jogos.score_b;

  if (timeA == nomeTime) {
    if (scoreA > scoreB) {
      return "#00FF00";
    } else {
      return "#FF0000";
    }
  } else {
    if (scoreB > scoreA) {
      return "#FF0000";
    } else {
      return "#00FF00";
    }
  }
}

export default function Desempenho() {
  const [fetchedPartidas, setFetchedPartidas] = useState([]);

  React.useEffect(() => {
    async function getData(valorInput) {
      const response = await axios.get(`/meme?pagina=${valorInput}`);
      //fetchedPartidas.push(response.data.partidas)
      setFetchedPartidas((fetchedPartidas) => [
        ...fetchedPartidas,
        response.data.partidas,
      ]);
    }
    var tamanhoHistorico = 5;
    for (let index = 1; index <= tamanhoHistorico; index++) {
      getData(index);
    }
  }, []);

  //setPartidas(fetchedPartidas)
  console.log(fetchedPartidas);
  if (fetchedPartidas.length == 5) {
    fetchedPartidas.forEach(setPartidasTime);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0 auto",
        gap: 2,
      }}
    >
      {partidas.map((partida) => {
        return (
          <Card
            variant="outlined"
            sx={{
              gap: 2,
              minWidth: "500px",
              maxWidth: "500px",
              maxHeight: "450px",
              minHeight: "450px",
              backgroundColor: alpha(trataResultadoCardCor(partida), 0.05),
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography level="h4">
                {partida.time_a} vs {partida.time_b}
              </Typography>
            </Box>
            <AspectRatio sx={{ my: 2 }} ratio="2">
              {setMapaImage(partida)}
            </AspectRatio>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography level="h4">
                {partida.jogos.score_a} X {partida.jogos.score_b}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  backgroundColor: alpha(trataResultadoCardCor(partida), 0.5),
                }}
              >
                Ver Detalhes
              </Button>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}
