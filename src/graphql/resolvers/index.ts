import { eventResolvers } from "./event";
import { userResolvers } from "./user";

const resolvers = {
    Query: {
        ...userResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...eventResolvers.Mutation
    }
}

export default resolvers