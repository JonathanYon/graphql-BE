import { ApolloServer, gql } from "apollo-server";

const persons = [
    {
        name: "Yonatan",
        lastName: "Mehari"
    },
    {
        name: "Sam",
        lastName: "Harris"
    }
]

const typeDefs = gql`
    type person {
        name: String
        lastName: String
    }

    type Query {
        persons: [person]
    }
`

const resolvers = {
    Query: {
        persons: () => persons
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log(`Running at ${url}`); 
})