const express =  require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
  games : [
    {
      id: 23,
      title: "Call of Dutty",
      year: 2019,
      price: 60
    },
    {
      id: 32,
      title: "Heroes of Might V",
      year: 2015,
      price: 89.9
    },
    {
      id: 7,
      title: "RedAlert Yuri Revenge",
      year: 2005,
      price: 8.99
    }
  ]
}

app.get('/games', (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get('/game/:id', (req, res) => {
  if(isNaN(req.params.id)){
      res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var game = DB.games.find(g => g.id == id);
    if(game == undefined) {
      res.sendStatus(404);
    } else {
      res.statusCode = 200;
      res.json(game);
    }
  }
});

app.listen(8081, () => {
  console.log("api rodando!");
});
