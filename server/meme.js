const fs = require("fs");

module.exports = {
  getDrzHistorico: function (req, res) {
    const axios = require("axios");
    const resultadosLobbyURL =
      "https://gamersclub.com.br/players/get_playerLobbyResults/latest/1";
    const gclubsess = "gclubsess=93b1ca845d0e943858deb03d843abf64cb651d64";
    var data = "as";
    try {
      axios
        .get(resultadosLobbyURL, {
          headers: {
            cookie: gclubsess,
          },
        })
        .then((response) => {
          data = response.data;
          res.json({ partidas: data.lista });
        });
    } catch (error) {
      console.log(error, error.message);
    }
  },
};
