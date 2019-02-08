import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";
import { viewerQuery } from "./User/queries/viewer.query";
import { IResolvers } from "../__generated__/graphql";

export const resolvers: IResolvers = {
  Query: {
    viewer: viewerQuery
  },
  User: {
    firstName: _ => _.firstName || null,
    lastName: _ => _.lastName || null,
    email: _ => {
      throw new Error("je crash dans email");
    }
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
