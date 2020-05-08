
require('dotenv').config()

const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema, execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const cors = require('cors')
const compression = require('compression')
const { createServer } = require('http')
// import mongoose from "mongoose";
const mongoose = require('mongoose')
const typeDefs = require('./src/graphql/typeDefs')

// import typeDefs from './src/graphql/typeDefs';
const rootValue = require('./src/graphql/resolvers')

const schema = buildSchema(typeDefs.default)

const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: rootValue.default,
  graphiql: true
}))
app.use(express.json())
app.use(cors())
app.use(compression())
const server = createServer(app)

let db
if (process.env.MG_USER) {
  db = `mongodb://${process.env.MG_USER}:${process.env.MG_PWD}@${process.env.MG_HOST}:${process.env.MG_PORT}/${process.env.MG_DB_NAME}`
} else db = 'mongodb://localhost:'.concat(process.env.MG_PORT, '/local')

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
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))
mongoose.set('debug', true)

const onConnect = function onConnect (ab, webSocket) {
  console.log('ab', ab)
  console.log('<><>webSocket', webSocket)
}
app.listen(process.env.APP_PORT || 4000, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    onConnect,
    schema
  }, {
    server: server,
    path: '/subscriptions'
  })
})
console.log('<><>db', db)
console.log(`Running a GraphQL API server at localhost:${process.env.APP_PORT || 4000}/graphql`)
