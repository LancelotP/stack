import * as express from "express";
import { createConnection, Connection, Tree } from "typeorm";
import { createServer, Server } from "http";
import { logInfo, logError, initLogger } from "./utils/logger";
import * as Redis from "ioredis";
import {
  setServerStatus,
  applyHealthCheckMiddleware
} from "./middlewares/healthcheck";
import { applyAuth0Middleware } from "./middlewares/auth0";
import { applyContextMiddleware } from "./middlewares/context";
import { applyGraphqlMiddleware } from "./middlewares/graphql";

export async function startServer(port: number, pid?: number) {
  initLogger(pid);

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
      entities: [`${__dirname}/models/**/*.entity.*?s`],
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

  applyHealthCheckMiddleware(app, processes, pid);
  logInfo("healthcheck middleware applied");

  applyAuth0Middleware(app);
  logInfo("auth0 middleware applied");

  applyContextMiddleware(app, {
    entities: `${__dirname}/models/**/*.entity.*?s`
  });
  logInfo("context middleware applied");

  applyGraphqlMiddleware(app);
  logInfo("graphql middleware applied");

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
