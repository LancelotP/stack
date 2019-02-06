import * as express from "express";
import * as jwt from "express-jwt";
import * as jwks from "jwks-rsa";

export function applyAuth0Middleware(app: express.Application) {
  app.use(
    jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_JWKS_URI
      }),
      credentialsRequired: false,
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
      algorithms: ["RS256"]
    }),
    // @ts-ignore
    (err, req, res, next) => {
      // middleware used to prevent tokenExpired errors
      next();
    }
  );
}
