const {buildSchema} = require('graphql')

module.exports = buildSchema(`

type BlogPost {
    _id:ID!
    title:String!
    text:String!
    date:String!
    creator:User!
}

type User{
    _id:ID!
    email:String!
    password:String
    createdBlogPosts:[BlogPost!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

input BlogPostInput {
    title:String!
    text:String!
}


input UserInput{
    email:String!
    password:String!
}

type RootQuery{
    blogPosts:[BlogPost!]!
    getBlogPost(_id:ID):BlogPost
    removeBlogPost(_id:ID):String!
    login(email: String!, password: String!): AuthData!
}


type RootMutation{
    createBlogPost(blogPostInput:BlogPostInput): BlogPost,
    createUser(userInput:UserInput):User
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)