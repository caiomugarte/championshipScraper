import React from "react";

const axios = require("axios");


function testePartida(partida){
  console.log(partida.clanTag_a)
}

export default function Expenses() {
  const [partidasLobby, setPartidasLobby] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get("/meme");
      setPartidasLobby(response.data);
      console.log(response.data);
      console.log("printando a var");
      console.log(partidasLobby)
    }
    getData();
  }, []);
  partidasLobby.forEach(testePartida)
  return (
    <div>
        {partidasLobby.map((partidas) => (
          <h1>{partidas.clanTag_a}</h1>
        ))} 
    </div>
    
  );
}
