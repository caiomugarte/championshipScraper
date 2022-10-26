const { default: axios } = require("axios");
const fs = require("fs");

module.exports = {
  getData: async function (req, res, paginaDados) {
    var historico = await getHistorico(paginaDados);
    var partidasId = getPartidasId(historico);
    var partidasURL = getPartidasURL(partidasId);
    getPartidas(partidasURL, historico, res);
    //partidas = await getPartidas(partidasURL);
  },
};

function funcaoTeste(teste) {
  console.log(teste);
}
async function getPartidas(urls, historico, res) {
  var partidas = [];
  Promise.all(
    urls.map(async (url) => {
      try {
        var response = await axios.get(url);
        partidas.push(response.data);
      } catch (error) {
        console.log(error, error.message);
      }
    })
  ).then(function () {
    trataResponse(partidas, historico, res);
  });
}

function getPartidasId(historico) {
  var partidasId = [];
  historico.map(function (historicoObj) {
    partidasId.push(historicoObj.idlobby_game);
  });
  return partidasId;
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

async function getHistorico(paginaHistorico) {
  const axios = require("axios");
  const resultadosLobbyURL =
    "https://gamersclub.com.br/players/get_playerLobbyResults/latest/" +
    paginaHistorico;
  const gclubsess = "gclubsess=93b1ca845d0e943858deb03d843abf64cb651d64";
  try {
    var response = await axios.get(resultadosLobbyURL, {
      headers: {
        cookie: gclubsess,
      },
    });
    var historico = response.data.lista;
    return historico;
  } catch (error) {
    console.log(error, error.message);
  }
}
