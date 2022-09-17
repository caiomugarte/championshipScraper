import React from "react";

const axios = require("axios");

export default function Desempenho() {
  var partidas;
  var partidasLobby = [];  
  async function getData() {
      const response = await axios.get("/meme");
      partidas = await response.data.partidas;
      partidas.forEach(function(partida, index) {
        partidasLobby.push(partida.idlobby_game);
      })
    }
    getData();
  
  async function getDataPartidas(){
  }
  return (
    <div>
      <h1>as</h1>
    </div>
    
  );
}
