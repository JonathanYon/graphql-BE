
import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import { ApolloServer, gql } from "apollo-server-express";

import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { constant } from "./config/constant";


const {MONGODB_URL} = constant
const port = constant.PORT

const app = express()

app.use(express.json())
app.use(cors())


const startServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs, resolvers, context: ({req}: any) => ({req})
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app, cors: false})

   
        mongoose.set('debug', true)
        mongoose.connect(MONGODB_URL)
        mongoose.connection.on('connected', () => {
            console.log("🍃 Successfully connected to mongo!");
            app.listen(port, () => {
                console.log(`server running on:  http://localhost:${port}${apolloServer.graphqlPath}`)
            })
        })
        mongoose.connection.on("error", (err) => {
            console.log("MONGO ERROR🚩🚩: ", err);
          });
   
}
startServer()


