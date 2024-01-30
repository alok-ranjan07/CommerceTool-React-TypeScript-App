import { myApiRoot } from "./client";

export const getCustomerDetails = () => {
  return myApiRoot.me().get().execute();
};
