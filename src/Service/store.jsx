import apiRoot from "./client";

export const getStoreDetails = () => {
  return apiRoot.stores().get().execute();
};

export const getStoreByKey = (event) => {
  return apiRoot.stores().withKey({ key: event.input }).get().execute();
};

export const getCustomersInStore = (event) => {
  return apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey: event.key })
    .customers()
    .get()
    .execute();
};

export const getCustomersInStoreByKey = (event) => {
  return apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey: event.storeKey })
    .customers()
    .withKey({ key: event.input })
    .get()
    .execute();
};

export const getProductsInStore = (event) => {
  return apiRoot
    .inStoreKeyWithStoreKeyValue({ storeKey: event.key })
    .productSelectionAssignments()
    .get()
    .execute();
};
