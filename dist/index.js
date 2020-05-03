"use strict";

require('dotenv').config();

var express = require('express');

var graphqlHTTP = require('express-graphql');

var _require = require('graphql'),
    buildSchema = _require.buildSchema; // import mongoose from "mongoose";


var mongoose = require('mongoose');

var typeDefs = require('./graphql/typeDefs'); 
// import typeDefs from './graphql/typeDefs';


var rootValue = require('./graphql/resolvers');

var schema = buildSchema(typeDefs.default);
var db;
if(process.env.MG_USER) {
  db = `mongodb://${process.env.MG_USER}:${process.env.MG_PWD}@${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_DB_NAME}`;
}
else db = "mongodb://localhost:".concat(process.env.MG_PORT, "/local");

var app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: rootValue.default,
  graphiql: true
})); // Connect to MongoDB with Mongoose.

mongoose.connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("MongoDB connected");
})["catch"](function (err) {
  return console.log(err);
});
mongoose.set('debug', true);
app.listen(process.env.APP_PORT || 4000);
console.log('<><>db', db);
console.log(`Running a GraphQL API server at localhost:${process.env.APP_PORT || 4000}/graphql`);