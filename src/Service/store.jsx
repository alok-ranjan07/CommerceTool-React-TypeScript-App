import apiRoot from "./client";

export const getStoreDetails = () => {
  return apiRoot.stores().get().execute();
};
