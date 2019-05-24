const express = require('express');
const http = require('http');
const Sequelize = require('sequelize');
const app = express();

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
    pic: "",
    title: "fix my shoes",
    description: "them be dinged up",
    user_id: 1
  },
  {
    pic: "",
    title: "paint my shoes",
    description: "bright pink please",
    user_id: 2
  },
  {
    pic: "",
    title: "shred them",
    description: "don't want them anymore",
    user_id: 3
  }
];

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
