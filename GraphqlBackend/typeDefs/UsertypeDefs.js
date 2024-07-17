const typeDefs = `#graphql
  scalar Upload

  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
  type User {
    id: ID!
    username: String!
    image: String
  }

  input SignUpInput {
    username: String!
    imageFile: Upload
  }

  type Mutation {
    signup(firstname:String,lastname:String,email:String,password:String,username:String,imageFile:Upload): User
    up(file:Upload):String 
  }
`;

export default typeDefs;