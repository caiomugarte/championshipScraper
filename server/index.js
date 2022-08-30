const express = require("express");
const app = express();
const PORT = process.env.port || 3001;
const axios = require("axios");

//const website = "https://news.sky.com";
const liquipediaURL =
  "https://liquipedia.net/counterstrike/Qualifier_Tournaments";
const cheerio = require("cheerio");

let content = [];
try {
  axios(liquipediaURL).then((response) => {
    const data = response.data;
    const $ = cheerio.load(data);

    $(".divRow", data).each(function () {
      const local = $(this)
        .find(".EventDetails.Location.Header")
        .find("a")
        .attr("title");
      const titulo = $(this)
        .find(".Tournament.Header")
        .find("b")
        .find("a")
        .text();
      console.log(titulo);
      content.push({
        titulo,
        local,
      });
    });
  });
} catch (error) {
  console.log(error, error.message);
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
app.get("/liquipedia", (req, res) => {
  console.log(content);
  res.json(content);
});

app.get("/", (req, res) => {
  res.json("hello world");
});
