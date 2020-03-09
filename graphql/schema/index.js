const {buildSchema} = require('graphql')

module.exports = buildSchema(`

type BlogPost {
    _id:ID!
    title:String!
    text:String!
    createdDate:String!
    lastModifiedDate:String!
    creator:User!
    tags:[String!]
    comments:[Comment!]!
}

type Comment{
    _id:ID!
    userName:String!
    createdDate:String!
    text:String!
    relatedPost:BlogPost!
    repliedComment:[Comment!]!
}

type User{
    _id:ID!
    email:String!
    password:String!
    createdBlogPosts:[BlogPost!]
}

type Tag{
    _id:ID!
    name:String!
    relatedBlogPosts:[BlogPost]!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

input BlogPostInput {
    title:String!
    text:String!
    tags:[String!]!
}


input UserInput{
    email:String!
    password:String!
}


type RootQuery{
    blogPosts:[BlogPost!]!
    getBlogPost(_id:ID):BlogPost
    getAllTags:[Tag!]
    removeBlogPost(_id:ID):String!
    login(email: String!, password: String!,keepLogin:Boolean!): AuthData!
    authAsAdmin:Boolean!
}


type RootMutation{
    createBlogPost(blogPostInput:BlogPostInput): BlogPost,
    createUser(userInput:UserInput):User,
    createTag(name:String):Tag
    updateBlogPost(_id:ID,title:String,text:String,tags:[String!]!):BlogPost
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)