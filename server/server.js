var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var urlServer = 'http://localhost:5000';

var app = express();

var books = [
  {
    titre: "Le Père Goriot",
    disponibilté: "Dispo"
  },
  {
    titre: "Marcovaldo",
    disponibilté: "non Dispo"
  },
  {
    titre: "Le Seigneur des anneaux",
    disponibilté: "Dispo"
  },
  {
    titre: "Angular 6 pour les pros",
    disponibilté: "non Dispo"
  }
  

];

// Middlewares
app.use(bodyParser.json()); // le body des requêtes sont parsées (json -> js)
//app.use(express.static('public'));

// Permet les requêtes cross-domain
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
});

// Routes

// get
app.get('/teams', (req, res) => res.json(teams));

app.get('/students', (req, res) => res.json(students));
app.get('/students/:id', (req, res) => {
  let id = req.params.id;
  for (let i=0; i<students.length; i++) {
    if (students[i].id == id) {
      return res.json(students[i])
    }
  }
  res.status(404).send('Etudiant inconnu');
});


app.get('/players', (req, res) => res.json(players));
app.get('/teams/:team/players', (req, res) => {
  var team = req.params.team;
  var playersFiltered = players.filter(player => player.current_team == team);
  return res.json(playersFiltered);
})

// post
app.post('/teams', function(req, res) {
  var id = getLastId(teams);
  var team = {
    id: id + 1,
    logo: req.body.logo,
    name: req.body.name,
    country: req.body.country,
    stadium: req.body.stadium,
    coach: req.body.coach,
    founded: req.body.founded,
    nbCup: req.body.nbCup
  };
  teams.push(team);
  res.json(team);
})

// put
app.put('/students/:id', (req, res) => {
  // mise à jour de l'étudiant ciblé
  if (req.body.id) {
    for(let i=0; i<students.length; i++) {
      if (students[i].id == req.body.id) {
        students[i] = req.body; // mise à jour
        break; // on sort de la boucle
      }
    }
    return res.json('mise à jour réussie');
  }
  res.status(500).send('Erreur'); // envoie du code erreur au client
})


// Helper functions
function getLastId(arr) {
  var maxId = 0;
  for (var i=0; i<arr.length; i++) {
    if (arr[i].id > maxId) {
      maxId = array[i].id
    }
  }
  return maxId;
}

app.listen(5000, () => console.log('Serveur écoute le port 5000...'));
