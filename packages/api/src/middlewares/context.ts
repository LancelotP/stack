import * as Dataloader from "dataloader";
import * as Sentry from "@sentry/node";
import { getConnection, getRepository } from "typeorm";
import { RequestHandler } from "express";

import entities from "../models";
import services from "../services";
import { User } from "../models/user.entity";

export function contextMiddleware(): RequestHandler {
  return async (req, res, next) => {
    let viewer: FZLViewer;

    try {
      if (req.user && req.user.sub) {
        viewer = await getRepository(User).findOne({
          where: { sub: req.user.sub }
        });

        if (!viewer) {
          const newUser = new User();

          newUser.sub = req.user.sub;

          viewer = await getRepository(User).save(newUser);
        }
      }
    } catch (e) {
      next(e);
    }

    if (viewer) {
      Sentry.configureScope(scope => {
        scope.setUser({
          id: viewer!.id.toString(),
          email: viewer!.email,
          firstName: viewer!.firstName,
          lastName: viewer!.lastName
        });
      });
    }

    req.ctx = generateContext(viewer);

    next();
  };
}

export type FZLContext = ReturnType<typeof generateContext>;
export type FZLLoaders = ReturnType<typeof generateLoaders>;
export type FZLServices = ReturnType<typeof generateServices>;
export type FZLViewer = User | undefined;

export function generateContext(viewer?: FZLViewer) {
  const loaders = generateLoaders();
  const services = generateServices(loaders, viewer);

  return {
    services,
    viewer: viewer || null
  };
}

function generateServices<S extends keyof typeof services>(
  loaders: FZLLoaders,
  viewer: FZLViewer
) {
  const map: {
    [P in keyof typeof services]: InstanceType<typeof services[P]>
  } = Object.create(null);

  Object.keys(services).map((key: S) => {
    // @ts-ignore
    map[key] = new services[key](loaders, undefined);
  });

  return map;
}

function generateLoaders() {
  const map: {
    [P in keyof typeof entities]: Dataloader<
      string | number,
      InstanceType<typeof entities[P]>
    >
  } = Object.create(null);

  for (const key in entities) {
    if (entities.hasOwnProperty(key)) {
      map[key as keyof typeof entities] = new Dataloader(
        createBatchFetch(entities[key as keyof typeof entities])
      );
    }
  }

  return map;
}

function createBatchFetch<Entity extends { id: number | string }>(
  repo: new () => Entity
): Dataloader.BatchLoadFn<string | number, Entity> {
  return async (keys: (string | number)[]) => {
    const entities = await getConnection()
      .getRepository<Entity>(repo)
      .findByIds(keys);

    const entityMap: { [k: string]: Entity } = {};

    entities.forEach(entity => {
      entityMap[entity.id] = entity;
    });

    return keys.map(key => entityMap[key]);
  };
}
