import * as jwt from "express-jwt";
import * as jwks from "jwks-rsa";
import { RequestHandler } from "express-serve-static-core";

export function auth0Middleware(params: {
  audience: string;
  issuer: string;
  jwksUri: string;
}): RequestHandler {
  return jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: params.jwksUri
    }),
    credentialsRequired: false,
    audience: params.audience,
    issuer: params.issuer,
    algorithms: ["RS256"]
  });
}
