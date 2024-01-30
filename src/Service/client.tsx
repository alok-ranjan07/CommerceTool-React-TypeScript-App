import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";

let clientId: string = "";
let clientSecret: string = "";
let projectKey: string = "";
let scopes: string[] = [""];
let username: string = "";
let password: string = "";
const authURL: string = process.env.REACT_APP_DEV_AUTH_URL;
const apiURL: string = process.env.REACT_APP_DEV_API_URL;

const createApiClient = () => {
  if (String(localStorage.getItem("skip")) === "true") {
    clientId = process.env.REACT_APP_DEV_CLIENT_ID;
    clientSecret = process.env.REACT_APP_DEV_CLIENT_SECRET;
    projectKey = process.env.REACT_APP_DEV_PROJECT_KEY;
    scopes = [process.env.REACT_APP_DEV_SCOPES];
  } else {
    clientId = localStorage.getItem("clientId") as string;
    clientSecret = localStorage.getItem("clientSecret") as string;
    projectKey = localStorage.getItem("projectKey") as string;
    scopes = [localStorage.getItem("scopes") as string];
  }

  // Configure authMiddlewareOptions
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authURL,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },
    scopes,
    fetch,
  };

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiURL,
    fetch,
  };

  // Create the ctpClient
  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKey,
  });
};

const createMyApiClient = () => {
  clientId = process.env.REACT_APP_ME_CLIENT_ID;
  clientSecret = process.env.REACT_APP_ME_CLIENT_SECRET;
  projectKey = process.env.REACT_APP_ME_PROJECT_KEY;
  scopes = [process.env.REACT_APP_ME_SCOPES];
  username = sessionStorage.getItem("customerEmail") as string;
  password = sessionStorage.getItem("customerPassword") as string;

  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: authURL,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
      user: {
        username: username,
        password: password,
      },
    },
    scopes,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiURL,
    fetch,
  };

  const client = new ClientBuilder()
    .withPasswordFlow(authMiddlewareOptions)
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: projectKey,
  });
};

export const apiRoot: ByProjectKeyRequestBuilder = createApiClient();
export const myApiRoot: ByProjectKeyRequestBuilder = createMyApiClient();
