import * as express from "express";
import { createConnection, Connection, Tree, EntitySchema } from "typeorm";
import { createServer, Server } from "http";
import * as Redis from "ioredis";
import * as Sentry from "@sentry/node";

import { logInfo, logError, initLogger } from "./utils/logger";

import {
  setServerStatus,
  applyHealthCheckMiddleware
} from "./middlewares/healthcheck";
import { auth0Middleware } from "./middlewares/auth0";
import { contextMiddlware } from "./middlewares/context";
import { graphqlMiddleware } from "./middlewares/graphql";

import { User } from "./models/user.entity";
import { File } from "./models/file.entity";

const entities = [User, File];

export async function startServer(port: number, pid?: number) {
  initLogger(pid);

  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });

  const app = express();
  const server = createServer(app);

  /**
   * POSTGRES CONNECTION
   */

  let connection: Connection;

  try {
    connection = await createConnection({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV !== "production",
      migrationsRun: process.env.NODE_ENV === "production",
      entities,
      migrations: [`${__dirname}/migrations/**\.*?s`]
    });

    logInfo("postgres connection initiated");
  } catch (e) {
    logError.extend("postgres")(e);
    stopServer({})("SIGTERM");
  }

  /**
   * REDIS PUBSUB CONNECTIONS
   */

  const redisOptions: Redis.RedisOptions = {
    host: "localhost",
    port: 6379,
    enableReadyCheck: true
  };

  const subscriber = new Redis(redisOptions);

  subscriber.on("error", e => logError.extend("redis:subscriber")(e));
  await new Promise(r => subscriber.on("ready", r));

  logInfo("redis subscriber connection initiated");

  const publisher = new Redis(redisOptions);

  publisher.on("error", e => logError.extend("redis:publisher")(e));
  await new Promise(r => publisher.on("ready", r));

  logInfo("redis publisher connection initiated");

  const processes = { server, connection: connection!, subscriber, publisher };

  /**
   * MIDDLEWARE INITIALISATION
   */

  app.use(Sentry.Handlers.requestHandler());
  logInfo("sentry request handler applied");

  applyHealthCheckMiddleware(app, processes, pid);
  logInfo("healthcheck middleware applied");

  app.use(
    auth0Middleware({
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
      jwksUri: process.env.AUTH0_JWKS_URI
    })
  );
  logInfo("auth0 middleware applied");

  app.use(
    contextMiddlware({
      entities: connection!.entityMetadatas
    })
  );
  logInfo("context middleware applied");

  app.use(graphqlMiddleware());
  logInfo("graphql middleware applied");

  app.use(Sentry.Handlers.errorHandler());
  logInfo("sentry error handler applied");

  logInfo("middlewares applied");

  /**
   * SERVER START
   */

  server.on("error", err => {
    logError(err);

    process.exit(1);
  });

  server.on("listening", () => {
    setServerStatus("STARTED");
    logInfo("http server listening on %d", port);

    if (!logInfo.enabled) {
      console.log("Listening on port %d", port);
    }
  });

  server.listen(port);

  /**
   * GRACEFUL SHUTDOWN
   */

  process.once("SIGTERM", stopServer(processes));
  process.once("SIGINT", stopServer(processes));
  process.once("SIGUSR2", stopServer(processes));
}

export function stopServer(processes: {
  server?: Server;
  connection?: Connection;
  subscriber?: Redis.Redis;
  publisher?: Redis.Redis;
}) {
  return async (signal: string) => {
    logInfo(`received signal: ${signal}`);
    logInfo("shutting down");
    setServerStatus("STOPPING");

    if (processes.connection && processes.connection.isConnected) {
      await processes.connection.close();
      logInfo("postgress connection closed");
    }

    if (processes.subscriber && processes.subscriber.status === "ready") {
      await processes.subscriber.quit();
      logInfo("redis subscriber connection closed");
    }

    if (processes.publisher && processes.publisher.status === "ready") {
      await processes.publisher.quit();
      logInfo("redis publisher connection closed");
    }

    if (processes.server) {
      processes.server.close();
      logInfo("http server closed");
    }

    process.kill(process.pid, signal);
  };
}
