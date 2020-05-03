
require('dotenv').config()

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// import mongoose from "mongoose";
const mongoose = require('mongoose');
const typeDefs = require('./src/graphql/typeDefs');

// import typeDefs from './src/graphql/typeDefs';
const rootValue = require('./src/graphql/resolvers');

const schema = buildSchema(typeDefs.default);
if(process.env.MG_USER) {
  db = `mongodb://${process.env.MG_USER}:${process.env.MG_PWD}@${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_DB_NAME}`;
}
else db = "mongodb://localhost:".concat(process.env.MG_PORT, "/local");
const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  mongoose.set('debug', true);
app.listen(process.env.APP_PORT || 4000);
console.log('<><>db', db);
console.log(`Running a GraphQL API server at localhost:${process.env.APP_PORT || 4000}/graphql`);