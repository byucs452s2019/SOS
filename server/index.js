const express = require('express');
const http = require('http');
const app = express();

app.get('/listings', (req, res) => {
  return res.send([
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
  ]);
});

app.post('/listing', (req, res) => {
  const {pic, title, description, user_id} = req.query;
  //TODO save these to something
  return res.send(true);
});

app.set('port', 8080);

const server = http.createServer(app);
server.listen(8080);
