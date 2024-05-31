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
      REACT_APP_SPEECH_KEY: string;
      REACT_APP_SPEECH_REGION: string;
      REACT_APP_ME_PROJECT_KEY: string;
      REACT_APP_ME_CLIENT_SECRET: string;
      REACT_APP_ME_CLIENT_ID: string;
      REACT_APP_ME_AUTH_URL: string;
      REACT_APP_ME_API_URL: string;
      REACT_APP_ME_SCOPES: string;
      REACT_APP_PAGE_SIZE: string;
    }
  }
}
export {};
