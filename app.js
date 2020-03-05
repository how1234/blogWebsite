const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config({ path: __dirname + "/.env" });

const graphQLMiddle = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

var ExpressBrute = require("express-brute");

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store, {
  freeRetries: 1000,
  attachResetToRequest: false,
  refreshTimeoutOnRequest: false,
  minWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
  maxWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
  lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds)
});



const app = express();

const graphQLSchema = require("./graphql/schema");

const graphQLResolver = require("./graphql/resolver/index");
const isAuth = require("./middleware/is-auth");

const mongoURL = `mongodb+srv://${process.env["MONGO_USER"]}:${process.env["MONGO_PASSWORD"]}@cluster0-8z33n.mongodb.net/bloggers_DB?retryWrites=true&w=majority`;



app.use(bodyParser.json());

app.use(cors());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "react_front_end/build")));

app.use(isAuth);

app.use(
  "/graphql",
  graphQLMiddle({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql:true
  })
);
app.post("/graphql", bruteforce.prevent, function(req, res, next) {
  next();
});

// Handles any requests that don't match the ones above


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "react_front_end/build/index.html"));
});

console.log('public url: ', process.env.PUBLIC_URL)




mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Server runs on local 8000");
  })
  .catch(err => {
    
    console.log(err);
  });

app.listen(8000 || process.env.PORT );
