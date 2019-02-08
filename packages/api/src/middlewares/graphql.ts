import * as fs from "fs";
import { Application, request, Request } from "express";
import {
  ApolloServer,
  IResolvers,
  PlaygroundConfig
} from "apollo-server-express";
import { resolvers } from "../graphql/shema";
import gql from "graphql-tag";
import fetch from "node-fetch";
import { generateContext } from "./context";

const schema = gql(
  fs.readFileSync(`${__dirname}/../__generated__/schema.graphql`).toString()
);

export async function applyGraphqlMiddleware(app: Application) {
  const apolloServer = new ApolloServer({
    resolvers: resolvers as IResolvers,
    typeDefs: schema,
    uploads: false,
    context: ({ req }: { req: Request }) => req.ctx,
    engine: {
      apiKey: process.env.APOLLO_ENGINE_API_KEY
    },
    playground:
      process.env.NODE_ENV !== "production"
        ? await generatePlaygroundConfig()
        : false
  });

  apolloServer.applyMiddleware({
    app,
    path: "/graphql"
  });
}

const viewerQuery = `query Viewer {
  viewer {
    id
  }
}`;

async function generateAuth0Token(): Promise<string> {
  const request = await fetch(`${process.env.AUTH0_ISSUER}oauth/token`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.AUTH0_TEST_CLIENT_ID,
      client_secret: process.env.AUTH0_TEST_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: "client_credentials"
    })
  });

  const res = await request.json();
  return res.access_token;
}

async function generatePlaygroundConfig(): Promise<PlaygroundConfig> {
  return {
    tabs: [
      {
        endpoint: "/graphql",
        headers: {
          Authorization: `Bearer ${await generateAuth0Token()}`
        },
        query: viewerQuery
      }
    ]
  };
}
