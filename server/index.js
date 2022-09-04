const express = require("express");
const app = express();
const PORT = process.env.port || 3001;
const axios = require("axios");
const fs = require("fs");
const path = require("path");
//const website = "https://news.sky.com";
const liquipediaURL =
  "https://liquipedia.net/counterstrike/Qualifier_Tournaments";
const cheerio = require("cheerio");

let content = [];
let html = "";
function getData(html) {
  const $ = cheerio.load(html);
  console.log("printando html");
  $(".divRow", html).each(function () {
    const local = $(this)
      .find(".EventDetails.Location.Header")
      .find("a")
      .attr("title");
    const titulo = $(this).find("b").text();
    const url = getUrlCampeonato($(this).find("b").find("a").attr("href"));
    content.push({
      titulo,
      local,
    });
  });
}

function getUrlCampeonato(href) {
  return "https://liquipedia.net" + href;
}

function tratarDataLiquipedia(data) {
  data = getDataLiquipedia(data);
  console.log(data);
  return data;
}

function getDataLiquipedia(data) {
  var ano = getAno(data);
  var mes = getMes(data);
  data = data.split(" - ");
  var dataInicio = new Date(data[0] + " " + ano);
  var dataFinal = new Date(
    data[0].split(" ")[0] + " " + data[3].replaceAll(",", "") + " " + ano
  );
  var dataInicioFormatada =
    ("0" + dataInicio.getDate()).slice(-2) +
    "/" +
    ("0" + (dataInicio.getMonth() + 1)).slice(-2) +
    "/" +
    ano;
  var dataFinalFormatada =
    ("0" + dataFinal.getDate()).slice(-2) +
    "/" +
    ("0" + (dataFinal.getMonth() + 1)).slice(-2) +
    "/" +
    ano;
  return dataInicioFormatada + " a " + dataFinalFormatada;
}

function getMes(data) {
  if (data.length) {
  }
}

function getAno(data) {
  return data.split(", ")[1];
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
  const file = fs.readFileSync(
    path.resolve(__dirname, "cacheData", "data.html"),
    "utf8"
  );
  getData(file);
  //getData(fs.readFile(path.resolve(__dirname, "cacheData", "data.html")));
  console.log(content);
  res.json(content);
});

app.get("/", (req, res) => {
  res.json("hello world");
});

app.get("/fetchData", (req, res) => {
  res.sendFile(path.resolve(__dirname, "cacheData", "data.html"));
  console.log(path.resolve(__dirname, "cacheData", "data.html"));
});
