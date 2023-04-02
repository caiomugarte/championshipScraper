const express = require("express");
const app = express();
const PORT = process.env.port || 3001;
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const meme = require("./meme");
const cors = require("cors");
const liquipediaURL =
  "https://liquipedia.net/counterstrike/Qualifier_Tournaments/";
const cheerio = require("cheerio");
const { response } = require("express");
const anoStr = "2023_"
const trimestresLiquipedia = 2
const partidasJsonFile = require("./cacheData/partidas.json")
let cachedPartidas = "";
app.use(cors())

function getPartidas(json) {
  let partidas = [];
  for(let pagina in json){
    partidas = partidas.concat(json[pagina])
  }
  partidasTratadas = trataPartidas(partidas);
  return partidasTratadas;
}

function trataPartidas(partidas) {
  let partidasTratadas = [];
  for (let partida in partidas){
    if(partidas[partida]['clanTag_a'] == 'DRZ' || partidas[partida]['clanTag_b'] == 'DRZ'){
      partidasTratadas.push(partidas[partida])
    }
  }
  return partidasTratadas;
}
function getData(html) {
  let content = [];
  const $ = cheerio.load(html);
  $(".gridRow", html).each(function () {
    const local = trataTextoHTML($(this)
      .find(".EventDetails.Location.Header")
      .find(".FlagText").text())
    const titulo = $(this).find("b").text();
    const data = $(this).find(".EventDetails.Date.Header").text();
    if(local == "Brazil" || local == "South America"){
      content.push({
        titulo,
        local,
        data,
      });
    }
  });
  return content
}

function trataTextoHTML(texto) {
  return texto.trim();
}

function carregaObjData(data, isInicio, isMesmoMes, ano) {
  if (isInicio) {
    console.log("testando inicio");
    return new Date(`${data[0]} ${data[1]} ${ano}`);
  }
  if (isMesmoMes) {
    return new Date(`${data[3]} ${data[4]} ${ano}`);
  } else {
    return new Date(`${data[0]} ${data[6]} ${ano}`);
  }
}

function trataDate(date) {
  var ano = date.split(", ")[1];
  var dataPeriodoCamp = date.split(",")[0].split(" ");
  if (dataPeriodoCamp.length > 2) {
  } else if (dataPeriodoCamp.length > 17) {
  } else {
  }
}

function writeCacheJSON(partidas, nomeArquivo) {
  fs.writeFile(
    path.resolve(__dirname, "cacheData", nomeArquivo),
    JSON.stringify(partidas),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

async function getHtmlCampeonatos(trimestre) {
  let html = "";
  let operacao = liquipediaURL + anoStr + trimestre
  await axios.get(operacao).then((response) => {
    html = response.data;
  });
  return html;
}

async function fetchDataPartidas(req, res) {
  meme.getData(req, res).then(() => {
    res.json({ mensagem: "Terminei de getData, cache atualizado com sucesso" });
  });
}

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

app.get('/', (req, res) => {
  res.send('Essa é a API do DRZ running com CORS 🥳')
})

app.get("/api/liquipedia", async (req, res) => {
  let contents = {}
  for (let i=1; i <= trimestresLiquipedia; i++) {
    let trimestre = "Q" + i
    let html = await getHtmlCampeonatos(trimestre)
    let content = getData(html)
    contents[trimestre] = content
  }
  res.json(contents);
});

app.get("/api/getPartidasGC", async (req, res) => {
  let partidas = []
  for (let i=1; i <= 5; i++){
    let operacao = "https://gamersclub.com.br/players/get_playerLobbyResults/latest/" + i
    const gclubess = "cf_clearance=kLXTQaDEXLjkvPf2dmNcRpyDuzO5UxNUisQRVXUA5VA-1680441611-0-160;gclubsess=2a8c4b615dee520692cd52ba062a20c1d39e5b64";
    let response;
    try {
      response = await axios.get(operacao, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62",
          cookie: gclubess,
        }
      });
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    
    let json = response.data.lista
    if(json.length > 0){
      partidas.push(json)
    }
  }
  writeCacheJSON(getPartidas(partidas), "partidas.json");
  res.json("Partidas Da GC Atualizadas com Sucesso");
})

app.get('/partidas.json', (req, res) => {
  res.sendFile(path.resolve(__dirname, "cacheData", "partidas.json"));
})

module.exports = app;
