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
let cachedPartidas = "";
app.use(cors())
function getPartidas(json) {
  var content = [];
  const partidas = JSON.parse(json);
  partidas.map((partida) => {
    content.push(partida);
  });
  return content;
}

function getData(html) {
  let content = [];
  const $ = cheerio.load(html);
  $(".gridRow", html).each(function () {
    const local = $(this)
      .find(".EventDetails.Location.Header")
      .find("a")
      .attr("title");
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

app.get("/api/partidas", async (req, res) => {
  cachedPartidas = fs.readFileSync(
    path.resolve(__dirname, "cacheData", "partidas.json"),
    "utf8"
  );
  res.json({ partidas: getPartidas(cachedPartidas) });
});

module.exports = app;
