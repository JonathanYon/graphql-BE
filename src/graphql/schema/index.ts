import { gql } from 'apollo-server'

const typeDefs = gql`

  type User {
    _id: ID!
    username: String
  }

  type Auth {
    _id: String!
    token: String!
    tokenExpire: Int!
    username: String!
  }

    type FullUser {
    id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    bio: String
    createdAt: Float
    updatedAt: Float
  }

  input SignUpInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input FullUserInput {
    _id: String!
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    bio: String
  }

  type Query {
    """
    get user only if user is looking their own info
    """
    getUser(id: ID!): FullUser!
    """
    login with username and password input
    """
    logIn(username: String!, password: String!): Auth!
  
  }

  type Mutation {
    """
    register with input of (RegisterInput object) for registering users
    """
    signUp(userSignUpInput: SignUpInput!): Auth!
    """
    Updating registered user with their full info (FullUserInput)
    """
    saveFullUserInfo(user: FullUserInput!): FullUser!
  }
`

export default typeDefs