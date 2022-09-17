const { default: axios } = require("axios");
const fs = require("fs");
var historico = "";
var partidasId = [];
var partidasLobby = [];

module.exports = {
  getHistorico: function () {
    const axios = require("axios");
    const resultadosLobbyURL =
      "https://gamersclub.com.br/players/get_playerLobbyResults/latest/1";
    const gclubsess = "gclubsess=93b1ca845d0e943858deb03d843abf64cb651d64";
    var data;
    try {
      axios
        .get(resultadosLobbyURL, {
          headers: {
            cookie: gclubsess,
          },
        })
        .then((response) => {
          data = response.data;
          setHistorico(data);
          setPartidasId(historico);
        })
    } catch (error) {
      console.log(error, error.message);
    }
    return historico;
  },
  

  getPartidasLobbyData: function() {
    var data;
    partidasId.forEach(function(id) {
      const partidasLobbyDataURL = `https://gamersclub.com.br/lobby/match/${id}/1`
      try {
        axios.get(partidasLobbyDataURL).then((response) => {
          data = response.data;
          setPartidasLobby(data);
        })
      } catch (error) {
        console.log(error, error.message);
      }
    })
    return partidasLobby;
  }
}


function setHistorico(data) {
  historico = data.lista;
}

function setPartidasId(partidas) {
  partidas.forEach(function (partida) {
    partidasId.push(partida.idlobby_game);
  })
}

function setPartidasLobby(data) {
  partidasLobby = "asd";
}

