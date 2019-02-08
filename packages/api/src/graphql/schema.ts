import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { viewerQuery } from "./User/queries/viewer.query";
import { IResolvers } from "../__generated__/graphql";

export const resolvers: IResolvers = {
  Query: {
    viewer: viewerQuery
  },
  User: {
    firstName: _ => _.firstName || null,
    lastName: _ => {
      throw new Error("Je crash sur lastname");
    },
    email: _ => _.email || null
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
