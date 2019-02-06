import { Application } from "express";
import * as Dataloader from "dataloader";
import * as glob from "glob";
import { getConnection } from "typeorm";
import { User } from "../models/user.entity";

export function applyContextMiddleware(
  app: Application,
  params: {
    entities: string;
  }
) {
  createDataLoaders(params.entities);

  return;
}

function createDataLoaders() {
  return {
    user: new DataLoader(createBatchFetch(User))
  };
}

function createBatchFetch<T extends { id: number }>(
  repo: new () => T
): DataLoader.BatchLoadFn<string | number, T> {
  return async (keys: (string | number)[]) => {
    const entities = await getConnection()
      .getRepository<T>(repo)
      .findByIds(keys);

    const entityMap: { [k: string]: T } = {};

    entities.forEach(entity => {
      entityMap[entity.id] = entity;
    });

    return keys.map(key => entityMap[key]);
  };
}
