const express = require("express");
const bodyParser = require("body-parser");
const graphQLMiddle = require("express-graphql");
const mongoose = require("mongoose");


const app = express();

const graphQLSchema = require('./graphql/schema')

const graphQLResolver = require('./graphql/resolver/index')


const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8z33n.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphQLMiddle({
    schema:graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true
  })
);

app.get("/", (req, res, next) => {
  res.send("hello world!");
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log(3000);
  })
  .catch(err => {
    console.log(err);
  });

app.listen(3000);
