const { default: axios } = require("axios");
const fs = require("fs");

var urlTeste = []
var partidas = [];
module.exports = {
  getData: async function(req, res){
    var historico = await getHistorico();
    await setPartidas(historico);
    
    trataResponse(historico, req, res)
  },
}

function getPartidasId(historico){
  var partidasId = []; 
  historico.map(function (historicoObj) {
    partidasId.push(historicoObj.idlobby_game)
  })
  return partidasId
}
async function setPartidas(historico) {
  var partidasId = getPartidasId(historico);
  axios.all(partidasId, 
  console.log(urlTeste);
}

function trataResponse(historico,  req, res) {
  res.json({historico: historico })
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
