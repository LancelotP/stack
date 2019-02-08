import { QueryResolvers } from "../../../__generated__/graphql";

export const viewerQuery: QueryResolvers.ViewerResolver = async (
  _,
  args,
  ctx
) => {
  await ctx.services.UserService.delete(14);

  return ctx.viewer;
};
