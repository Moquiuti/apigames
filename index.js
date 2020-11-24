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

app.post('/game', (req, res) => {
    var{title, price, year} = req.body;
    DB.games.push({
      id: 124,
      title,
      price,
      year
    });
    res.sendStatus(200);
});

app.delete('/game/:id', (req, res) => {
  if(isNaN(req.params.id)){
      res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex(g => g.id == id);

    if(index == -1){
      res.sendStatus(404);
    } else {
      DB.games.splice(index,1);
      res.sendStatus(200);
    }
  }
});

app.put('/game/:id', (req, res) => {
  if(isNaN(req.params.id)){
      res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var game = DB.games.find(g => g.id == id);
    if(game == undefined) {
      res.sendStatus(404);
    } else {
        var{title, price, year} = req.body;
        if(title != undefined){
          game.title = title;
        }
        if(price != undefined){
          game.price = price;
        }
        if(year != undefined){
          game.year = year;
        }
        res.sendStatus(200);
    }
  }
});

app.listen(8081, () => {
  console.log("api rodando!");
});
