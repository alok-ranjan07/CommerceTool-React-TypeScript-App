import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";

const projectKey: string = process.env.REACT_APP_DEV_PROJECT_KEY;
const scopes: string[] = [process.env.REACT_APP_DEV_SCOPES];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_DEV_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_DEV_CLIENT_ID,
    clientSecret: process.env.REACT_APP_DEV_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_DEV_API_URL,
  fetch,
};

// Create the ctpClient
const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withProjectKey(projectKey)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(
  ctpClient
).withProjectKey({
  projectKey: projectKey,
});

export default apiRoot;
