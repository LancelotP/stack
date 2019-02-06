import { Application, Request, Response, NextFunction } from "express";
import { Server } from "http";
import { Connection, getConnection, createConnection } from "typeorm";
import Redis from "ioredis";
import { logError } from "../utils/logger";

let status: "STARTING" | "STARTED" | "STOPPING" = "STARTING";

export function applyHealthCheckMiddleware(
  app: Application,
  processes: {
    server: Server;
    connection: Connection;
    subscriber: Redis.Redis;
    publisher: Redis.Redis;
  },
  pid?: number
) {
  app.get("/healthcheck", async (req, res) => {
    const statuses = {
      id: pid,
      server: status,
      postgres: false,
      subscriber: processes.subscriber.status,
      publisher: processes.subscriber.status,
      uptime: process.uptime()
    };

    try {
      const connection = await createConnection({
        name: "healthcheck",
        type: "postgres",
        url: process.env.DATABASE_URL
      });

      statuses.postgres = connection.isConnected;

      await connection.close();

      res.status(200);
    } catch (e) {
      logError.extend("postgres")("healthcheck failed");
      logError.extend("postgres")(e);

      res.status(500);
    }

    res.json(statuses);
  });
}

export function setServerStatus(
  newStatus: "STARTING" | "STARTED" | "STOPPING"
) {
  status = newStatus;
}
