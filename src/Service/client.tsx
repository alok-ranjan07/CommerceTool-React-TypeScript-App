import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder } from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";

const projectKey = process.env.REACT_APP_DEV_PROJECT_KEY;
const scopes = [process.env.REACT_APP_DEV_SCOPES];

// Configure authMiddlewareOptions
const authMiddlewareOptions = {
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
const httpMiddlewareOptions = {
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

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKey,
});

export default apiRoot;
