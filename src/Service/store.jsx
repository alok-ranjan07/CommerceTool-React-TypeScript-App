import apiRoot from "./client";

export const getStoreDetails = () =>
   apiRoot.stores().get().execute();


export const getStoreByKey = (event) =>
  apiRoot
    .stores()
    .withKey({ key: event.input })
    .get()
    .execute();

export const getCustomersInStore = (event) =>
    apiRoot
      .inStoreKeyWithStoreKeyValue(event.key).customers().get().execute();

export const getProductsInStore = (event) => 
      apiRoot.
      inStoreKeyWithStoreKeyValue(event.key).productSelectionAssignments().get().execute();
