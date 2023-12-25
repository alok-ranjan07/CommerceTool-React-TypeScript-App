/// <reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_DEV_PROJECT_KEY: string;
      REACT_APP_DEV_CLIENT_SECRET: string;
      REACT_APP_DEV_CLIENT_ID: string;
      REACT_APP_DEV_AUTH_URL: string;
      REACT_APP_DEV_API_URL: string;
      REACT_APP_DEV_SCOPES: string;
    }
  }
}
export {};
