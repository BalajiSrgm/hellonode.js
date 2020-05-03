

var mongoose = require('mongoose');
var _ = require('lodash');
var fs = require('fs');
const db = "mongodb://localhost:32768/local";
const events = require('./events.json');
var Event = require('../models/Event');
// const events = fs.readFileSync(__dirname + '/events.json', 'utf-8');
// Connect to MongoDB with Mongoose.

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:32768/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    
    dbo.collection("events").insertMany(events, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });