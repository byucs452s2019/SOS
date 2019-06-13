const express = require('express');
const http = require('http');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Listing = require('./Schema/listing');
const User = require('./Schema/user');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIAJ67PJWGOC26ERDZA",
  secretAccessKey: "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"
});
const s3 = new AWS.S3();


const MongoClient = require('mongodb').MongoClient
mongoose.connect('mongodb://localhost:27017/SOS');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("connection successful");

});

app.use(express.json());

app.get('/hi', (req, res) => {


  return res.send("worked");

});



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

  return res.send([
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
]);

});

app.post('/creator', (req, res) => {
  const {pic, name, user_id} = req.body;
  creators.push({pic, name, user_id});
  return res.send(true);
});

app.post('/user', (req, res) => {
  var tempUser = new User(req.body);

  tempUser.save(function (err, user) {
    if (err) throw err;
    console.log("saved");
  });
  return res.send(true);
});

app.get('/listings', (req, res) => {
  Listing.find((err, listings) => {
    if (err) throw err;
    return res.send(listings);
  });
});

app.post('/listing', (req, res) => {
  var img_path = req.body.pic.uri;

  var tempListing = new Listing({
    title: req.body.title,
    description: req.body.description,
    user_id: req.body.user_id,
  });

  var bucket = 'sosphotos';

  var params = {
    Bucket: bucket,
    Body: fs.createReadStream(img_path),
    Key: "folder/"+Date.now()+"_"+path.basename(img_path),
    ContentType: "image/jpeg"
  };

  s3.upload(params, function(err, data) {
    if (err){
      console.log("error ", err);
    }
    if (data) {
      //console.log(data.Location);
      tempListing.pic = data.Location

      tempListing.save(function (err, listing) {
        if (err) throw err;
        console.log("saved");
      });
    }
  })

  return res.send(true);
});

app.set('port', 8080);

const server = http.createServer(app);
server.listen(8080);
