import { gql } from 'apollo-server'

const typeDefs = gql`

  type User {
    _id: ID!
    username: String
  }

    type UserFull {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    bio: String
    createdAt: Float
    updatedAt: Float
  }

  input RegisterInput {
    username: String
    password: String
  }



  type Query {
    getUser: [User]!
  }

  type Mutation {
    #input for register
    """
    #input for register
    """
    register(input: RegisterInput!): User!
  }
`

export default typeDefs