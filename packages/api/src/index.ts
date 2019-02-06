import { startServer } from "./server";
import * as throng from "throng";
import debug from "debug";
import { logInfo, logError } from "./utils/logger";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      DATABASE_URL: string;
      WEB_CONCURRENCY: string;
      AUTH0_JWKS_URI: string;
      AUTH0_AUDIENCE: string;
      AUTH0_ISSUER: string;
    }
  }
  // namespace Express {
  //   interface Request {
  //     ctx: FZLContext;
  //   }
  // }
}

debug.enable("fzl*");

const envVariables = [
  "DATABASE_URL",
  "WEB_CONCURRENCY",
  "AUTH0_JWKS_URI",
  "AUTH0_AUDIENCE",
  "AUTH0_ISSUER"
];

const missingVariables = envVariables.filter(e => process.env[e] === undefined);

missingVariables.forEach(e =>
  logError.extend("env")(`missing env variable: '${e}'`)
);

if (missingVariables.length) {
  process.exit(1);
}

logInfo("starting %d processes", process.env.WEB_CONCURRENCY);

throng({
  workers: parseInt(process.env.WEB_CONCURRENCY),
  start: pid => startServer(parseInt(process.env.PORT), pid)
});
