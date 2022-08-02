# A Blog Backend Project with GraphQL 

## Purpose of This Project 

The purpose of this project written with Typescript, GraphQL, and React is mainly To:

1. Gain better understanding and usage of Typescript.

2. Learn GraphQL by doing and have clear understanding of the difference     between GraphQL and REST API

## Project Setting

### Project Structure 

This project tried to use [Bulletproof node.js project architecture 🛡️](https://softwareontheroad.com/ideal-nodejs-project-structure/) architecture written by Sam Quinn

| Directory | Description                                                  |
| --------- | ------------------------------------------------------------ | 
| app.ts    | App entry point                                              |
| api       | Express route controllers for all the endpoint of the app    |
 


 I'm going to apply "The principle of separation of concerns" with Controller - Service Layer - Data Access Layer (3 Layer Architecture).

 ### Project Init

 ```bash
 $mkdir <serverName>
 $cd <serverName>
 $touch index.js or index.ts or index.tsx
 $npm init -y
 $tsc --init
 ```
 ### Installing Apollo Server and GraphQL
 ```bash
 $npm i apollo-server graphql
 ```

 -    apollo-serve is a GaphQL server package provided by Apollo.
 -    graphql is a package that implements the GraphQL specification defined by Facebook in JS language.

 Apollo-server and Apollo-Client depends on graphql package, so you're supposed to install this package together (apollo-server in the backend and apollo-client in the frontend project).

 ### Basic Server Code | Index.ts

 First thing first, We need index.ts to use Apollo-Server

 ```javascript
 import {ApolloServer, gql} from "apollo-server";
 ```

 -    ApolloServer is a constructor that creates a GraphQL server instance.
 -    gql is a template literal tag used to define a GraphQL schema in JavaScript.

 Then we write a code similar to the following...

 ```javascript
 const typeDefs = gql`
        type Query {
            name: string
        }
`;

const resolvers = {
    Query: {
        name: () => "Yonatan"
    }
};
```

-    The typeDefs variable defines the GraphQL schema type using gql.
-    The resolvers variable assigns an object containing functions that define the data to be provided via the GraphQL schema.
-    The above is to define a query called name that can respond to String data, and then always respond with the string "Yonatan" when a query request called name comes in.

...And Finally..

```javascript
const port = 4000
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(port, () => {
    console.log(`server running on:  http://localhost:${port}/`)
  });
```

The code above creates a GraphQL server instance by passing typeDefs and resolvers to the ApolloServer constructor, and writes code that starts the server.

### Run Server

When run Apollo-Server with the command below, You can see "Apollo Server ready at http/graphql"

```bash
$node .
$node index.js
```

After that, implement the following code in your index.js file.

