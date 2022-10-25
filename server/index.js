const express = require("express");
const app = express();
const PORT = process.env.port || 3001;
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const meme = require("./meme");
//const website = "https://news.sky.com";
const liquipediaURL =
  "https://liquipedia.net/counterstrike/Qualifier_Tournaments";
const cheerio = require("cheerio");
const { response } = require("express");

let content = [];
let cachedData = "";

function getData(html) {
  const $ = cheerio.load(html);
  $(".divRow", html).each(function () {
    const local = $(this)
      .find(".EventDetails.Location.Header")
      .find("a")
      .attr("title");
    const titulo = $(this).find("b").text();
    const data = trataDate($(this).find(".EventDetails.Date.Header").text());
    content.push({
      titulo,
      local,
      data,
    });
  });
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

function carregaDataFormatada(objDate) {
  return `${("0" + objDate.getDate()).slice(-2)}/${(
    "0" +
    (objDate.getMonth() + 1)
  ).slice(-2)}`;
}

function trataDate(date) {
  console.log(date);
  var ano = date.split(", ")[1];
  var dataPeriodoCamp = date.split(",")[0].split(" ");
  if (dataPeriodoCamp.length > 2) {
  } else if (dataPeriodoCamp.length > 17) {
  } else {
  }
}

function fetchData() {
  try {
    axios.get(liquipediaURL).then((response) => {
      html = response.data;
      fs.writeFile(
        path.resolve(__dirname, "cacheData", "data.html"),
        html,
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    });
    return "";
  } catch (error) {
    console.log(error, error.message);
  }
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/liquipedia", (req, res) => {
  cachedData = fs.readFileSync(
    path.resolve(__dirname, "cacheData", "data.html"),
    "utf8"
  );
  getData(cachedData);
  res.json(content);
  //console.log(content);
});

app.get("/", (req, res) => {
  res.json("hello world");
});

app.get("/fetchData", (req, res) => {
  fetchData();
  res.sendFile(path.resolve(__dirname, "cacheData", "data.html"));
  console.log(path.resolve(__dirname, "cacheData", "data.html"));
});

app.get("/meme", async (req, res) => {
  const paginaDados = req.query.pagina;
  meme.getData(req, res, paginaDados);
});
