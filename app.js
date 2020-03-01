const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const graphQLMiddle = require("express-graphql");
const mongoose = require("mongoose");
const  cors = require('cors')

const app = express();

const graphQLSchema = require('./graphql/schema')

const graphQLResolver = require('./graphql/resolver/index')
const isAuth = require('./middleware/is-auth')


const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8z33n.mongodb.net/bloggers_DB?retryWrites=true&w=majority`;

app.use(bodyParser.json());


app.use(cors())

app.use(isAuth)







app.use(
  "/graphql",
  graphQLMiddle({
    schema:graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true
  })
);



mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Server runs on local 8000");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(8000);
