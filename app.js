const express = require("express");
const bodyParser = require("body-parser");
const graphQLMiddle = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const BlogPost = require("./models/blogPost");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const app = express();

const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8z33n.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphQLMiddle({
    schema: buildSchema(`

        type BlogPost {
            _id:ID!
            title:String!
            description:String!
            date:String!
        }
        
        type User{
            _id:ID!
            email:String!
            password:String
        }

        
        input BlogPostInput {
            title:String!
            description:String!
        }


        input UserInput{
            email:String!
            password:String!
        }

        type RootQuery{
            blogPosts:[BlogPost!]!
        }
        

        type RootMutation{
            createBlogPost(blogPostInput:BlogPostInput): BlogPost,
            createUser(userInput:UserInput):User
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      blogPosts: () => {
        return BlogPost.find()
          .then(result => {
            return result.map(blogpost => ({
              ...blogpost._doc,
              _id: blogpost.id
            }));
          })
          .catch(err => {
            throw err;
          });
      },
      createBlogPost: args => {
        const blogPost = new BlogPost({
          title: args.blogPostInput.title,
          description: args.blogPostInput.description,
          date: new Date()
        });

        return blogPost
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: result.id };
          })
          .catch(err => {
            console.log(err);
          }); //It's a promise if return it
      },
      createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            console.log(result);
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
      }
    },
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
