import { gql } from 'apollo-server'

const typeDefs = gql`

  type Event {
    id: String!
  }

  type Events {
    totalCount: Int
    events: [FullEvent]
  }

  type Auth {
    _id: String!
    token: String!
    tokenExpire: Int!
    username: String!
  }

  type FullEvent {
    _id: String
    title: String!
    start: String!
    end: String!
    url: String
    description: String!
    isPrivate: Boolean!
    createdBy: String
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

  input EventInput {
    title: String!
    start: String!
    end: String!
    description: String!
    isPrivate: Boolean!
  }

  input EventInputToUpdate {
    id: String
    title: String
    start: String
    end: String
    description: String
    isPrivate: Boolean
  }

  input EventFilter {
    id: String!
    searchInput: String
    pagePagination: Int
    pageSize: Int
  }
  input AllEventsInput {
    id: String!
    searchInput: String
    pagePagination: Int
    pageSize: Int
    currentEvents: Boolean
    expiredEvents: Boolean
  }

  type Query {
    """
    get user only if user is looking their own info
    """
    getUser(id: ID!): FullUser!
    """
    get single event of a user
    """
    getEvent(id: String!): FullEvent!
    """
    get single event of a user
    """
    allEvents(events: AllEventsInput!): Events!
    """
    get user's all Event
    """
    getUserEvents( pageFilter: EventFilter): Events!
    """
    login with username and password input
    """
    logIn(username: String!, password: String!): Auth!
  
  }

  type Mutation {
    """
    Register with input of (RegisterInput object) for registering users
    """
    signUp(userSignUpInput: SignUpInput!): Auth!
    """
    Updating registered user with their full info (FullUserInput)
    """
    saveFullUserInfo(user: FullUserInput!): FullUser!
    """
    Creating user's Event
    """
    createEvent(event: EventInput!): Event!
    """
    Updating user's Event
    """
    updateEvent(event: EventInputToUpdate!, id: String): FullEvent!
    """
    Deleting user's Event
    """
    deleteEvent(id: String!): Boolean!
  }
`

export default typeDefs