import { RequestHandler } from "express";
import { EntityMetadata } from "typeorm";

export function contextMiddlware(params: {
  entities: EntityMetadata[];
}): RequestHandler {
  params.entities.forEach(entity => {
    console.log(entity.name, entity.target);
  });

  return (req, res, next) => {
    next();
  };
}
