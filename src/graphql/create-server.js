import { GraphQLServer } from "graphql-yoga"
import mongoose from "mongoose"
import { formatError } from "apollo-errors"
import { Mutation, Query } from "./resolvers"

const { NODE_ENV } = process.env

const createServer = () => {
  return new GraphQLServer({
    typeDefs: "./src/graphql/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    playground: NODE_ENV === "development",
    formatError,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: request => ({ ...request, db: mongoose.connection })
  })
}

export default createServer
