import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";

const axios = require("axios");
const nomeTime = "Dancing Ratz";
var partidas = [];
var roundsTR = 0;
var roundsCT = 0;
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

function setarRoundsPartida(partida) {
  var partidaId = partida.id;
  localStorage.setItem(`${partidaId}roundsTR`, roundsTR);
  localStorage.setItem(`${partidaId}roundsCT`, roundsCT);
  console.log(roundsTR);
  console.log(roundsCT);
}

function getRoundPartida(partidaId, isTR) {
  var query = "";
  if (isTR) {
    query = `${partidaId}roundsTR`;
  } else {
    query = `${partidaId}roundsCT`;
  }
  var round = localStorage.getItem(query);
  if (round) {
    return round;
  }
}

export default function PartidasRound() {
  const [fetchedPartidas, setFetchedPartidas] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get(`/partidas`);
      //fetchedPartidas.push(response.data.partidas)
      setFetchedPartidas((fetchedPartidas) => [
        ...fetchedPartidas,
        response.data.partidas,
      ]);
    }
    getData();
  }, []);
  console.log(fetchedPartidas);
  fetchedPartidas.forEach(setPartidasTime);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0 auto",
        gap: 2,
        padding: "50px",
      }}
    >
      {partidas.map((partida) => {
        return (
          <Box id={partida.id}>
            <Sheet
              sx={{
                width: 300,
                mx: "auto", // margin left & right
                my: 4, // margin top & botom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
              }}
              variant="outlined"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  margin: "0 auto",
                  gap: 2,
                  padding: "1px",
                }}
              >
                <Typography>
                  {partida.time_a} vs {partida.time_b}
                </Typography>
                <TextField
                  defaultValue={getRoundPartida(partida.id, true)}
                  onChange={(event) => {
                    roundsTR = event.target.value;
                  }}
                  label="Round TR"
                ></TextField>
                <TextField
                  defaultValue={getRoundPartida(partida.id, false)}
                  onChange={(event) => {
                    roundsCT = event.target.value;
                  }}
                  label="Round CT"
                ></TextField>
                <Button onClick={() => setarRoundsPartida(partida)}>
                  Setar Rounds
                </Button>
              </Box>
            </Sheet>
          </Box>
        );
      })}
    </Box>
  );
}
