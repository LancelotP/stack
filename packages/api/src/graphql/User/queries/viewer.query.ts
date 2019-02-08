import { QueryResolvers } from "../../../__generated__/graphql";

export const viewerQuery: QueryResolvers.ViewerResolver = (_, args, ctx) => {
  return ctx.viewer;
};
