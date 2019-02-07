import { RequestHandler } from "express";
import {
  EntityMetadata,
  Connection,
  ObjectType,
  Repository,
  getConnection
} from "typeorm";

import entities from "../models/index";

function generateLoaders(): { [P in keyof typeof entities]: Repository<InstanceType<typeof entities[P]>> } {
  const foo: { [P in keyof typeof entities]: Repository<InstanceType<typeof entities[P]>> } = Object.create(null);

  for (const key in entities) {
    if (entities.hasOwnProperty(key)) {
      foo[key as keyof typeof entities] = getConnection().getRepository(entities[key as keyof typeof entities]);
    }
  }

  return foo;
}

const repos: { [P in keyof typeof entities]: Repository<InstanceType<typeof entities[P]>> } = {
  File: getConnection().getRepository(entities.File),
  User: getConnection().getRepository(entities.User)
};

repos.

function createRepos() {
  // @ts-ignore
  const foo: {
    [k in keyof typeof entities]: ReturnType<typeof createRepo>
  } = {};

  // @ts-ignore
  Object.keys(entities).map(
    key => (foo[key] = createRepo<typeof entities[key]>(entities[key]))
  );

  return foo;
}

function createRepo<Entity>(entity: new () => Entity): Repository<Entity> {
  return getConnection().getRepository(entity);
}

// export function contextMiddlware<Entity>(
//   repo: new () => Entity
// ): Repository<Entity> {
//   return getConnection().getRepository(repo);
// }
