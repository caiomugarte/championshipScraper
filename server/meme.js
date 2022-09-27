const { default: axios } = require("axios");
const fs = require("fs");

var partidas = [];
module.exports = {
  getData: async function(req, res){
    var historico = await getHistorico();
    var partidasId = getPartidasId(historico);
    var partidasURL = getPartidasURL(partidasId);
    var partidasPromises = getPartidasPromises(partidasURL);
    partidas = await getPartidas(partidasPromises);
    
    trataResponse(partidas, req, res)
  },
}

function getPartidasId(historico){
  var partidasId = []; 
  historico.map(function (historicoObj) {
    partidasId.push(historicoObj.idlobby_game)
  })
  return partidasId
}
function getPartidasPromises(urls){
  var arrayPromises = []; 
  urls.map(function (url) {
    arrayPromises.push(axios.get(url));
  })
  return arrayPromises;
}

async function getPartidas(promises) {
  var arrayPartidas = [];
  axios.all(promises).then(axios.spread((...responses) => {
    responses.map(function (response){
      console.log(response.data.id)
      arrayPartidas.push(response.data);
    });
    return arrayPartidas;
  }))
}

function getDadosPartidas(response) {
  return [2, 3, 4];
}

function getPartidasURL(partidasId) {
  var arrayURL = [];
  partidasId.map(function (id) {
    var url = "https://gamersclub.com.br/lobby/match/" +id+ "/1"
    arrayURL.push(url);
  })
  return arrayURL;
}

function trataResponse(partidas,  req, res) {
  res.json({partidas: partidas })
}

async function getHistorico() {
  const axios = require("axios");
  const resultadosLobbyURL =
    "https://gamersclub.com.br/players/get_playerLobbyResults/latest/1";
  const gclubsess = "gclubsess=93b1ca845d0e943858deb03d843abf64cb651d64";
  try {
    var response = await axios.get(resultadosLobbyURL, {
      headers: {
        cookie: gclubsess,
      },
    });
    var historico = response.data.lista;
    return historico
  } catch (error) {
    console.log(error, error.message)
  }
}
