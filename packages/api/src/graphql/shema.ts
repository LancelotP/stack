import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { viewerQuery } from "./User/queries/viewer.query";
import { IResolvers } from "../__generated__/graphql";

export const resolvers: IResolvers = {
  Query: {
    viewer: viewerQuery
  },
  Mutation: {},
  Subscription: {},
  /**
   * SCALARS
   */
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime
};
