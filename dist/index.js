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
console.log('<><>typeDefs', typeDefs)
var schema = buildSchema(`
type User {
    id: String!
    name: String!
    email: String!
  }
  type Query {
    user(id: String!): User
    users: [User]
  }
  type Mutation {
    addUser(id: String!, name: String!, email: String!): User
    editUser(id: String, name: String, email: String): User
    deleteUser(id: String, name: String, email: String): User
  }
  type Subscription {
    newUser: User
  }`);

  var schema1 = buildSchema(typeDefs.default);
var db = "mongodb://localhost:".concat(process.env.MG_PORT, "/local");
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema1,
  rootValue: rootValue,
  graphiql: true
})); // Connect to MongoDB with Mongoose.

mongoose.connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(function () {
  return console.log("MongoDB connected");
})["catch"](function (err) {
  return console.log(err);
});
mongoose.set('debug', true);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');