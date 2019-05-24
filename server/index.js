const express = require('express');
const http = require('http');
const Sequelize = require('sequelize');
const app = express();
app.use(express.json());

const DB = new Sequelize({dialect: 'sqlite', storage: './db.sqlite'});

class User extends Sequelize.Model {}
User.init({
  id: {type: Sequelize.INTEGER, primaryKey: true},
  username: {type: Sequelize.STRING, allowNull: false},
  password: {type: Sequelize.STRING, allowNull: false},
}, {sequelize: DB, modelName: 'user'});

class Listing extends Sequelize.Model {}
Listing.init({
  id: {type: Sequelize.INTEGER, primaryKey: true},
  pic: {type: Sequelize.STRING},
  title: {type: Sequelize.STRING, allowNull: false},
  description: {type: Sequelize.STRING, allowNull: false},
  user_id: {type: Sequelize.INTEGER.UNSIGNED},
}, {sequelize: DB, modelName: 'listing'});
const listings = [
  {
    pic: "http://tebbsja.com/vans_bape.png",
    title: "HELP - Custom Vans",
    description: "I have a black pair of Vans, can someone do these?",
    user_id: 1
  },
  {
    pic: "http://tebbsja.com/yellowed_soles.png",
    title: "UNYELLOW?",
    description: "Space Jam 2009's - Would like to get the soles back to a milky color",
    user_id: 2
  },
  {
    pic: "http://tebbsja.com/crumbling_soles.png",
    title: "MIDSOLE CRUMBLING - SOLE SWAP?",
    description: "I Don't have donors for these, how much would a sole swap + donors be?",
    user_id: 3
  }
];

const creators = [
  {
    pic: "http://tebbsja.com/kickasso.jpg",
    name: "Kickasso",
    user_id: 1
  },
  {
    pic: "http://tebbsja.com/HoHShoes.jpg",
    name: "HoH Shoes",
    user_id: 2
  },
  {
    pic: "http://tebbsja.com/JSM.png",
    name: "JSM CUSTOMS",
    user_id: 3
  }
]

app.get('/workers', (req, res) => {
  return res.send([
    {
      id: 1,
      user_id: 2,
      reviews: [],
      folios: [],
    },
    {
      id: 2,
      user_id: 3,
      reviews: [],
      folios: [],
    }
  ]);
});

app.get('/creators', (req, res) => {
  return res.send(creators);
});

app.post('/creator', (req, res) => {
  const {pic, name, user_id} = req.body;
  creators.push({pic, name, user_id});
  return res.send(true);
})

app.get('/listings', (req, res) => {
  return res.send(listings);
  // return res.send([
  //   {
  //     pic: "",
  //     title: "fix my shoes",
  //     description: "them be dinged up",
  //     user_id: 1
  //   },
  //   {
  //     pic: "",
  //     title: "paint my shoes",
  //     description: "bright pink please",
  //     user_id: 2
  //   },
  //   {
  //     pic: "",
  //     title: "shred them",
  //     description: "don't want them anymore",
  //     user_id: 3
  //   }
  // ]);
});

app.post('/listing', (req, res) => {
  const {pic, title, description, user_id} = req.body;
  listings.push({pic, title, description, user_id});
  //TODO save these to something
  return res.send(true);
});

app.set('port', 8080);

const server = http.createServer(app);
server.listen(8080);
