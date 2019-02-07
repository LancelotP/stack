import { IResolvers } from "./graphql";
import viewerQuery from "./User/queries/viewer.query";
import { User } from "../models/user.entity";

export const resolvers: IResolvers<{}> = {
  Query: {
    viewer: viewerQuery
  },
  Estate: {
    currentSale: estateCurrentSaleResolver
  }
};


function createEstate(viewer?: User, params: string) {
  if (!viewer) {
    throw new Error('t\'es con');
  }

  console.log(viewer);
  
  return 'string';
}

const ctxCreateEstate = createEstate.bind(null, 'toto');

function createContextMethod<T, R>(method: (viewer: User, ...args: T[]) => R, viewer: User): (...args: T[]) => ReturnType<typeof method> {
  return function(...args: any[]) {
    return method(viewer, ...args);
  }
}

createContextMethod(createEstate)()

ctxCreateEstate()

createEstateMutation(parents, args, ctx) {
  ctx.repositories.estate.create(args.input);
}

ctx.repositories.estate = {
  create: createEstate.bind(null, viewer)
}