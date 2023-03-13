const { default: axios } = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  getData: async function () {
    var paginaDados = 5;
    var historicosPartidas = await getHistorico(paginaDados);
    var partidasId = getPartidasId(historicosPartidas);
    var partidasURL = getPartidasURL(partidasId);
    setPartidas(partidasURL);
  },
};

function getPartidasId(historicosPartidas) {
  var idPartidas = [];
  historicosPartidas.map((historico) => {
    if (historico !== undefined) {
      historico.map((partida) => {
        var id = partida.idlobby_game;
        idPartidas.push(id);
      });
    }
  });
  return idPartidas;
}

async function setPartidas(urls) {
  var partidas = [];
  Promise.all(
    urls.map(async (url) => {
      try {
        var response = await axios.get(url);
        partidas.push(await response.data);
      } catch (error) {
        console.log(error, error.message);
      }
    })
  ).then(() => {
    setarJsonPartidas(partidas);
  });
}

function setarJsonPartidas(partidas) {
  fs.writeFile(
    path.resolve(__dirname, "cacheData", "partidas.json"),
    JSON.stringify(partidas),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

function getPartidasURL(partidasId) {
  var arrayURL = [];
  partidasId.map(function (id) {
    var url = "https://gamersclub.com.br/lobby/match/" + id + "/1";
    arrayURL.push(url);
  });
  return arrayURL;
}

function trataResponse(partidas, historico, res) {
  res.json({ partidas: partidas, historico: historico });
}

async function getHistorico(paginaDados) {
  var arrayHistorico = [];
  const axios = require("axios");
  for (let index = 0; index <= paginaDados; index++) {
    const resultadosLobbyURL =
      "https://gamersclub.com.br/players/get_playerLobbyResults/latest/" +
      index;
    const gclubsess = "gclubsess=93b1ca845d0e943858deb03d843abf64cb651d64";
    try {
      var response = await axios.get(resultadosLobbyURL, {
        headers: {
          cookie: gclubsess,
        },
      });
      arrayHistorico.push(response.data.lista);
    } catch (error) {
      console.log(error, error.message);
    }
  }
  return arrayHistorico;
}
