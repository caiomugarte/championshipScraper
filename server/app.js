const express = require("express");
const app = express();
const PORT = process.env.port || 3000;
const axios = require("axios");

const website = "https://news.sky.com";

const cheerio = require("cheerio");

try {
  axios(website).then((response) => {
    const data = response.data;
    const $ = cheerio.load(data);

    let content = [];

    $(".sdc-site-tile__headlinde", data).each(function () {
      const titulo = $(this).text();
      const url = $(this).find("a").attr("href");

      content.push({
        title,
        url,
      });
      app.get("/", (req, res) => {
        "Hello World";
        console.log(content);
        res.json(content);
      });
    });
  });
} catch (error) {
  console.log(error, error.message);
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
